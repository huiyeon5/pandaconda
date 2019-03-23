import os
import pandas as pd
import re
import json
from collections import Counter
from math import sqrt
from Levenshtein import distance

def word2vec(word):
    # count the characters in word
    cw = Counter(word)
    # precomputes a set of the different characters
    sw = set(cw)
    # precomputes the "length" of the word vector
    lw = sqrt(sum(c * c for c in cw.values()))

    # return a tuple
    return cw, sw, lw


def cosdis(v1, v2):
    # which characters are common to the two words?
    common = v1[1].intersection(v2[1])
    # by definition of cosine distance we have
    return sum(v1[0][ch] * v2[0][ch] for ch in common) / v1[2] / v2[2]


def clean_headers(headers):
    return re.sub('[^a-zA-Z]+', '', headers)


def suggest_headers(path, valid_headers, header_types):
    df = pd.read_csv(path)
    columns = list(df.columns)
    returned_list = []
    threshold = -0.5

    #number of rows in the dataframe
    num_rows = len(df)

    count_threshold = int(num_rows * 0.9)

    checked_headers = {}

    #create a dictionary for what data types are in each column
    header_dict = {}
    for header in columns:
        header_dict[header] = {}

    for index, row in df.iterrows():
        for header in columns:
            data = row[header]
            try:
                temp_data = int(data)
                data_str = str(data)
                if '.' in data_str:
                    temp_header_dict = header_dict[header]
                    if 'double' in temp_header_dict:
                        value = temp_header_dict['double'] + 1
                        temp_header_dict['double'] = value
                    else:
                        temp_header_dict['double'] = 1
                    header_dict[header] = temp_header_dict
                else:
                    temp_header_dict = header_dict[header]
                    if 'int' in temp_header_dict:
                        value = temp_header_dict['int'] + 1
                        temp_header_dict['int'] = value
                    else:
                        temp_header_dict['int'] = 1
                    header_dict[header] = temp_header_dict
            except:
                temp_header_dict = header_dict[header]
                if 'date' in temp_header_dict:
                    value = temp_header_dict['date'] + 1
                    temp_header_dict['date'] = value
                else:
                    temp_header_dict['date'] = 1
                header_dict[header] = temp_header_dict

    for header in columns:
        temp_dict = header_dict[header]
        for k, v in temp_dict.items():
            if v >= count_threshold:
                checked_headers[header] = k
            else:
                checked_headers[header] = None
    
    #if index is present and must be dropped
    if columns[0] == 'Unnamed: 0' and df[columns[0]].dtype == 'int64':
        returned_list.append({'col_header' : columns[0], 'imported_as': valid_headers.sort(), 'drop' : True, 'cosine' : 'NA'})
        #user_headers = [ clean_headers(header) for header in columns[1:] ]

        #all_correct = True
        # return_header_types = {}
        #loop through remaining headers
        for i in range(1, len(columns)):
            column = columns[i]
            #if header is part of the valid list
            if column in valid_headers:
                imported_as = [column]
                temp_valid_headers = []
                type_to_get = checked_headers[column]
                if type_to_get == None:
                    temp_valid_headers = valid_headers
                else:
                    temp_valid_headers = [k for k,v in header_types.items() if v == type_to_get]
                if column in temp_valid_headers:
                    temp_valid_headers.remove(column)
                temp_valid_headers.sort()
                imported_as.extend(temp_valid_headers)
                returned_list.append({'col_header' : column, 'imported_as': imported_as, 'drop' : False, 'cosine' : 'high'})
                # return_header_types[column] = header_types.get(column)
            #header is not part of valid list
            else:
                #all_correct = False
                column_vec = word2vec(column)
                ranked_headers = []
                type_to_get = checked_headers[column]
                temp_valid_headers = []
                if type_to_get == None:
                    temp_valid_headers = valid_headers
                else:
                    temp_valid_headers = [k for k,v in header_types.items() if v == type_to_get]

                for valid_header in temp_valid_headers:
                    valid_header_vec = word2vec(valid_header)
                    cosine_value = cosdis(column_vec, valid_header_vec)
                    ranked_headers.append([valid_header, (cosine_value*-1)])
                ranked_headers = sorted(ranked_headers, key = lambda x: (x[1], x[0]))
                #header has cosine similarity score of 1.0 but they are not the same words
                if ranked_headers[0][1] == 1.0 and ranked_headers[0][0] != column:
                    lev_ranked_headers = []
                    for valid_header in temp_valid_headers:
                        edit_distance = distance(column, valid_header)
                        lev_ranked_headers.append([valid_header, 1/edit_distance])
                    lev_ranked_headers = sorted(lev_ranked_headers, key = lambda x: (x[1], x[0]))
                    #edit distance has a low score
                    if lev_ranked_headers[0][1] < threshold:
                        toReturn = []
                        for temp in lev_ranked_headers:
                            toReturn.append(temp[0])
                        returned_list.append({'col_header' : column, 'imported_as': toReturn, 'drop' : False, 'cosine' : 'low'})
                    else:
                        toReturn = []
                        for temp in lev_ranked_headers:
                            toReturn.append(temp[0])
                        returned_list.append({'col_header' : column, 'imported_as': toReturn, 'drop' : False, 'cosine' : 'high'})                   
                #header has low cosine similarity score
                elif ranked_headers[0][1] < threshold:
                    toReturn = []
                    for temp in ranked_headers:
                        toReturn.append(temp[0])
                    returned_list.append({'col_header' : column, 'imported_as': toReturn, 'drop' : False, 'cosine' : 'low'})
                #header has relatively high cosine similarity score so display the highest suggested header
                else:
                    toReturn = []
                    for temp in ranked_headers:
                        toReturn.append(temp[0])
                    returned_list.append({'col_header' : column, 'imported_as': toReturn, 'drop' : False, 'cosine' : 'high'})                   
        # if not all_correct:
        #     return json.dumps({
        #         "status": 200,
        #         "headers" : return_header_types,
        #         "data" : 
        #     })
    #no index in the csv file
    else:
        all_correct = True
        #user_headers = [ clean_headers(header) for header in columns ]
        return_header_types = {}
        for i in range(len(columns)):
            column = columns[i]
            #if header is part of the valid list
            if column in valid_headers:
                imported_as = [column]
                temp_headers = []
                type_to_get = checked_headers[column]
                if type_to_get == None:
                    temp_headers = valid_headers
                else:
                    temp_headers = [k for k,v in header_types.items() if v == type_to_get]
                if column in temp_headers:
                    temp_headers.remove(column)
                temp_headers.sort()
                imported_as.extend(temp_headers)
                returned_list.append({'col_header' : column, 'imported_as': imported_as, 'drop' : False, 'cosine' : 'high'})
                return_header_types[column] = header_types.get(column)
            else:
                all_correct = False
                column_vec = word2vec(column)
                ranked_headers = []
                type_to_get = checked_headers[column]
                temp_valid_headers =[]
                if type_to_get == None:
                    temp_valid_headers = valid_headers
                else:
                    temp_valid_headers = [k for k,v in header_types.items() if v == type_to_get]

                for valid_header in temp_valid_headers:
                    valid_header_vec = word2vec(valid_header)
                    cosine_value = cosdis(column_vec, valid_header_vec)
                    ranked_headers.append([valid_header, (cosine_value*-1)])
                ranked_headers = sorted(ranked_headers, key = lambda x: (x[1], x[0]))
                
                #header has cosine similarity score of 1.0 but they are not the same words
                if ranked_headers[0][1] == 1.0 and ranked_headers[0][0] != column:
                    lev_ranked_headers = []
                    for valid_header in temp_valid_headers:
                        edit_distance = distance(column, valid_header)
                        lev_ranked_headers.append([valid_header, 1/edit_distance])
                    lev_ranked_headers = sorted(lev_ranked_headers, key = lambda x: (x[1], x[0]))
                    #edit distance has a low score
                    if lev_ranked_headers[0][1] < threshold:
                        toReturn = []
                        for temp in lev_ranked_headers:
                            toReturn.append(temp[0])
                        returned_list.append({'col_header' : column, 'imported_as': toReturn, 'drop' : False, 'cosine' : 'low'})
                    else:
                        toReturn = []
                        for temp in lev_ranked_headers:
                            toReturn.append(temp[0])
                        returned_list.append({'col_header' : column, 'imported_as': toReturn, 'drop' : False, 'cosine' : 'high'})                   
                elif ranked_headers[0][1] < threshold:
                    toReturn = []
                    for temp in ranked_headers:
                        toReturn.append(temp[0])
                    returned_list.append({'col_header' : column, 'imported_as': toReturn, 'drop' : False, 'cosine' : 'low'})
                else:
                    toReturn = []
                    for temp in ranked_headers:
                        toReturn.append(temp[0])
                    returned_list.append({'col_header' : column, 'imported_as': toReturn, 'drop' : False, 'cosine' : 'high'}) 
        if all_correct:
            return json.dumps({
                "status" : 200,
                "headers" : return_header_types,
                "data" : df.to_json(orient='records')
            })
    return json.dumps({'data':returned_list, "status":400})

    def get_header_type(header):
        header_types = {'Depot' : 'int', 'SKU' : 'int', 'Customer': 'int', 'ActivityDate' : 'date', 'Inventory' : 'int', 'SKUKey' : 'int', 'UnitVol' : 'double', 'UnitPrice' : 'double'}
        return header_types[header]
