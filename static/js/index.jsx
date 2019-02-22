import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import HomeContent from "./HomeContent";
import UploadContent from "./UploadContent";
import VisualisationContent from "./VisualisationContent";
import Signup from "./Signup";
import EditTable from "./EditTable"
import Manage from "./Manage"
import Datasets from "./Datasets"
import 'babel-polyfill';


const loginPage = document.getElementById("loginPage");
if (loginPage) {
  ReactDOM.render(<App />, loginPage);
}

const homePage = document.getElementById("homePage");
if (homePage) {
  ReactDOM.render(<HomeContent />, homePage);
}

const uploadPage = document.getElementById("uploadPage");
if (uploadPage) {
  ReactDOM.render(<UploadContent />, uploadPage);
}

const visualisationPage = document.getElementById("visualisationPage");
if (visualisationPage) {
  ReactDOM.render(<VisualisationContent />, visualisationPage);
}

const signupPage = document.getElementById("signupPage");
if (signupPage) {
  ReactDOM.render(<Signup />, signupPage);
}

const tablePage = document.getElementById("tablePage");
if (tablePage) {
  ReactDOM.render(<EditTable />, tablePage);
}

const managePage = document.getElementById("managePage");
if (managePage) {
  ReactDOM.render(<Manage />, managePage);
}

const datasetsPage = document.getElementById("datasetsPage");
if (datasetsPage) {
  ReactDOM.render(<Datasets />, datasetsPage);
}