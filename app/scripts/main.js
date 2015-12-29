console.log('Hello gulp-livereload!');

var mockData = {
  baseLayer: "mock data"
}




	var ToolBelt = {
			/*
			Gets the data from the spreadsheet and passes it to the parserData function.
			*/
			getData: function () {
				var googleUrl = 'https://spreadsheets.google.com/feeds/list/@apiKey/od6/public/values?alt=json';
				var apiKey = '1B3FjBgeqYpcObgL9MxEcwUyVfBkNMAWaQkbbrPorJCs';

				return $.ajax({
						url: googleUrl.replace('@apiKey', apiKey),
						dataType: 'jsonp'
					})
					.done(function (data) {
						ToolBelt.parseData(data);
						console.log("success");

					})
					.fail(function () {
						console.log("error");
					})
					.always(function () {
						console.log("complete");
					});
			},

      /*
      Reveives the data from the getData function and extracts the useful data
      )*/
      parseData: function (rawData) {
      // var obj = rawData.feed.entry;
      //   Object.keys(obj).forEach(function(key){
      //
      //     var value = obj[key];
      //     var matched = key.match(/gsx\$/);
      //     console.log(matched);
      //   })
        $.each(rawData.feed.entry, function(ix, val){
          obj = {
            baseLayer:'objsdafsadfdsaf'
          };
          for (var key in val){
            var matched = key.match(/gsx\$/);
            if (matched) {
    					obj[key.slice(4)] = val[key].$t;
    				}

          }
  renderPage(obj);
        })



      },


			/*
			* Generates the Handlebars template
			* @param {Object} data

			*/

		} // end of ToolBelt

	function renderPage(data) {
		var template = $('#main-template').html(),
			compiled = Handlebars.compile(template),
			// rendered = compiled({title: "somethinf", baseLayer: "baseLayer"});
			rendered = compiled(data);
		$("#main").html(rendered);

	}

	ToolBelt.getData();
// renderPage();
