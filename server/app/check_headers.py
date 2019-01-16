import os
import pandas as pd
import re
import json
from collections import Counter
from math import sqrt

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


def suggest_headers(path):
    valid_headers = ['Depot', 'SKU', 'Customer', 'ActivityDate', 'Inventory', 'SKUKey', 'UnitVol', 'UnitPrice']

    df = pd.read_csv(path)
    columns = list(df.columns)
    returned_list = []
    threshold = -0.5
    
    #if index is present and must be dropped
    if columns[0] == 'Unnamed: 0' and df[columns[0]].dtype == 'int64':
        returned_list.append({'col_header' : columns[0], 'imported_as': valid_headers.sort(), 'drop' : True, 'cosine' : 'NA'})
        user_headers = [ clean_headers(header) for header in columns ]
        #loop through remaining headers
        for i in range(1, len(user_headers)):
            column = user_headers[i]
            #if header is part of the valid list
            if column in valid_headers:
                imported_as = [column]
                temp_headers = list(user_headers)
                temp_headers.remove(column)
                temp_headers.sort()
                imported_as.extend(temp_headers)
                returned_list.append({'col_header' : column, 'imported_as': imported_as, 'drop' : False, 'cosine' : 'high'})
            #header is not part of valid list
            else:
                column_vec = word2vec(column)
                ranked_headers = []
                for valid_header in valid_headers:
                    valid_header_vec = word2vec(valid_header)
                    cosine_value = cosdis(column_vec, valid_header_vec)
                    ranked_headers.append([valid_header, (cosine_value*-1)])
                ranked_headers = sorted(ranked_headers, key = lambda x: (x[1], x[0]))
                #header has low cosine similarity score
                if ranked_headers[0][1] < threshold:
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
    #no index in the csv file
    else:
        user_headers = [ clean_headers(header) for header in columns ]
        for i in range(len(user_headers)):
            column = user_headers[i]
            #if header is part of the valid list
            if column in valid_headers:
                imported_as = [column]
                temp_headers = list(user_headers)
                temp_headers.remove(column)
                temp_headers.sort()
                imported_as.extend(temp_headers)
                returned_list.append({'col_header' : column, 'imported_as': imported_as, 'drop' : False, 'cosine' : 'high'})
            else:
                column_vec = word2vec(column)
                ranked_headers = []
                for valid_header in valid_headers:
                    valid_header_vec = word2vec(valid_header)
                    cosine_value = cosdis(column_vec, valid_header_vec)
                    ranked_headers.append([valid_header, (cosine_value*-1)])
                ranked_headers = sorted(ranked_headers, key = lambda x: (x[1], x[0]))
                
                if ranked_headers[0][1] < threshold:
                    toReturn = []
                    for temp in ranked_headers:
                        toReturn.append(temp[0])
                    returned_list.append({'col_header' : column, 'imported_as': toReturn, 'drop' : False, 'cosine' : 'low'})
                else:
                    toReturn = []
                    for temp in ranked_headers:
                        toReturn.append(temp[0])
                    returned_list.append({'col_header' : column, 'imported_as': toReturn, 'drop' : False, 'cosine' : 'high'}) 
    return json.dumps({'data':returned_list})