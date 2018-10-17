    $(document).ready(function() {
        $.ajax({

            url: 'http://10.254.145.77/backend/dataset.groovy?term=all',
            dataType: "json",

            success: function(data) {
                console.log(data);

            var datasetHtml = '<ul class="media-list media-list-divider">'
            var i=1;
            $.each(data, function() {
                if(this._source.dataset_name=='full_text_embeddings'||this._source.dataset_name=='PPI_Network_graph'){
                datasetHtml=datasetHtml+'<li class="media"><div class="media-body">\
                <div class="media-heading">'+this._source.dataset_name+'</div>\
                <div class="text-muted">'+this._source.description+'</div>\
                 <div style="padding-left: 50px;"> <div class="media-body"><div class="media-heading"></div><a class="text-success" data-toggle="collapse" href="#faq1-'+i+'">Details:<i class="fa fa-angle-down" style="padding-left: 20px;"></i></a>\
                 <div class="collapse" id="faq1-'+i+'"><ul>\
                 <li><p><b>Dataset Source Link:   </b><small class="text-muted">' + this._source.source_link + '</small></p></li>\
                 <li><p><b>experiment.parameters:</b></p><ul><li><p><b>representation-size:   </b>' + this._source.experiment.parameters["size"] + '</p></li>\
                 <li><p><b>min-count:    </b>' + this._source.experiment.parameters["min-count"] + '</p></li>\
                 <li><p><b>sg:             </b>' + this._source.experiment.parameters.sg+ '</p></li>\
                 <li><p><b>window-size:</b>' + this._source.experiment.parameters["window-size"] + '</p></li></ul>\
                 <li><p><b>original_dataset:</b></p><ul>'
}
else{
datasetHtml=datasetHtml+'<li class="media"><div class="media-body">\
                <div class="media-heading">'+this._source.dataset_name+'</div>\
                <div class="text-muted">'+this._source.description+'</div>\
                 <div style="padding-left: 50px;"> <div class="media-body"><div class="media-heading"></div><a class="text-success" data-toggle="collapse" href="#faq1-'+i+'">Details:<i class="fa fa-angle-down" style="padding-left: 20px;"></i></a>\
                 <div class="collapse" id="faq1-'+i+'"><ul>\
                 <li><p><b>Dataset Source Link:   </b><small class="text-muted">' + this._source.source_link + '</small></p></li>\
                 <li><p><b>experiment.parameters:</b></p><ul><li><p><b>representation-size:   </b>' + this._source.experiment.parameters["representation-size"] + '</p></li>\
                 <li><p><b>walk-length:    </b>' + this._source.experiment.parameters["walk-length"] + '</p></li>\
                 <li><p><b>sg:             </b>' + this._source.experiment.parameters.sg+ '</p></li>\
                 <li><p><b>window-size:</b>' + this._source.experiment.parameters["window-size"] + '</p></li></ul>\
                 <li><p><b>original_dataset:</b></p><ul>'

}
              var org=this._source.experiment.original_dataset;
              var orgarray=org.toString().split(',');

            $.each(orgarray, function() {
                datasetHtml=datasetHtml+'<li><a class="text-muted" target="_blank" href="'+this+'">' +this+ '</a></li>'

            });
                

                datasetHtml=datasetHtml+'</ul></li></div></div></div>'
                datasetHtml=datasetHtml+'</div></li>'
                i=i+1;
                });
            datasetHtml=datasetHtml+'</ul>'
             $('#dataset').append(datasetHtml);

            },
            error: function(data) {
                console.log("Dataset error");



            }


        })

    });