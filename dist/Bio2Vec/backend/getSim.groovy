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
def q = params.id
def ds= params.dataset

url = 'http://10.254.145.46:9200/'
http = new HTTPBuilder(url)

println new JsonBuilder(search(q,ds))

def search(def id,def dataset) {
  def fres = ""
  def fres2 = null
  def query = /
  {
  "query" : {
            "bool" : {
              "should" : [
                    { "term" :{"id" : "http://www.uniprot.org/uniprot/Q9BDU1"}}, 
                    { "term" : {"dataset_name" : "PPI_Network_graph"}} 
                  ],
              "should" : [
                 { "term" : {"id" : "http://www.uniprot.org/uniprot/H0VP47"}}, 
                 { "term" : {"dataset_name" : "PPI_Network_graph"}}
              ],
              "should" : [
                 { "term" : {"id" : "http://id.nlm.nih.gov/mesh/2016/C560164"}}, 
                 { "term" : {"dataset_name" : "Lod4ML_mesh"}}
              ]
           }
   }
}/

  def jsonSlurper = new JsonSlurper()
  def js = new JsonBuilder(jsonSlurper.parseText(query))
  def t

  http.post( path: '/bio2vec/_search', requestContentType : JSON, body: js.toString() ) { resp, reader -> t = reader }

  return t.hits.hits
}
