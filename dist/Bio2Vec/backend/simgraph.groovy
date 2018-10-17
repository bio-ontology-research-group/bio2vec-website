
@Grab(group='org.codehaus.groovy.modules.http-builder', module='http-builder', version='0.7.1' )

import groovyx.net.http.HTTPBuilder
import groovy.json.*
import java.net.*
import static groovyx.net.http.Method.GET
import static groovyx.net.http.Method.POST
import static groovyx.net.http.ContentType.*

if(!application) {
  application = request.getApplication(true)
}

response.contentType = 'application/json'
def vector = params.vector
def dataset = params.dataset



//url = 'http://ontolinator.kaust.edu.sa:9200/'
url = 'http://10.254.145.46:9200/'
//println vector
println " { \"data\" : "+new JsonBuilder(similar(vector, dataset))+"}"

def similar(def vector, def dataset) {
  //def vector = search(id)
   //println searchscore

  if (vector) {
    
    vector = vector.split(",").collect { new Double(it)}
    def query
  query =  /
       {
    "query": {
        "function_score": {
            "query" : {
                "query_string": {
                    "query": "dataset_name: $dataset"
                }
            },
            "script_score": {
                "script": {
                    "inline": "payload_vector_score",
                "lang": "native",
                "params": {
                    "field": "@model_factor",
                    "vector": $vector,
                    "cosine" : true
                    }
      }
            },
            "boost_mode": "replace"
        }
    },
    
    "sort": [ {"_score": "desc"},{"id": "desc"}],
    "size":1000
  }/


    def jsonSlurper = new JsonSlurper()
    def js = new JsonBuilder(jsonSlurper.parseText(query))
    def t
    http = new HTTPBuilder(url)
    http.post( path: '/bio2vec/_search', requestContentType : JSON, body: js.toPrettyString() ) { resp, reader -> t = reader }
    http.shutdown()
    def rmap = []
    t.hits.hits.each { hit ->
      def row = []
      
      def rid = hit._source.id
      row << hit._source.name
      row << hit._source.id
      row << hit._source.entity_type
      row << hit._source.pca_x
      row << hit._source.pca_y
      row<< hit._id
      rmap << row
    }
    rmap
  } else {
    []
  }
}
