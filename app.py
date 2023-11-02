from flask import Flask, request
from flask import render_template
from search import search
import html

app = Flask(__name__)

def show_search_form():
    return render_template("/index.html")

def run_search(query):
    results = search(query)
    results["snippet"] = results["snippet"].apply(lambda x: html.escape(x))

    return render_template("/results.html", results=results, placeholder=query)

@app.route("/demo", methods=["GET", "POST"])
def search_demo():
    return render_template("/resultsDemo.html", row={'rank':'10', 'link':'alekthegenius.github.io', 'snippet':'This is a demo of Squawkrates!!', 'title':'Aleks Website'}, placeholder="")

@app.route("/", methods=["GET", "POST"])
def search_form():
    if request.method == "GET":
        if "query" in request.args:
            if request.args["query"] != "":
                query = request.args["query"]
                return run_search(query)
            else:
                return show_search_form()
        else:
            return show_search_form()
    else:
        return show_search_form()
