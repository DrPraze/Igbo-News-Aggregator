
$(document).ready(()=>{
	getNews();

	function getNews(){
		let endPoint = "https://newsapi.org/v2/top-headlines";
		let apiKey = "your newsapi.org api key";
		//sources can be added from the included links.txt
		let urls = [
			`${endPoint}?source=techcrunch&apiKey=${apiKey} `,
			`${endPoint}?country=ng&category=business&apiKey=${apiKey} `
		];

		let allResults = [];

		let count = urls.length-1;
		const get =(real)=>{
			$.getJSON(urls[ count ], function(data) {
				console.log("JSON data has been retrieved from " + data.source);
				let news = data.articles; //get only the news articles
				allResults.push(news)
				// printNews(news);
				real();
			})
		};
		recurse();		

		function recurse(){
			if(count >= 0){
				get(recurse);
				count--;
			}
			else
				//allResults is  an arrray of nested objects
				printNews(allResults);
		}
	}

	function getIgbo(query){
		let igboapi_key = "your api key from igboapi.com";
		let Igbo_endpoint = `https://igboapi.com/api/v1/words?keyword=${query}&apikey=${igboapi_key}`;

		const getIgbo = (real)=>{
			$.getJSON(Igbo_endpoint, function(data){
				console.log("Translation retrieved from "+data.source);
				let translation = data.word;
				return translation;
			});
		}
	}

	//display the news
	function printNews(result){	

		let res=[];
		//flatten the array of nested objects into one single array
		result.map(list=>{
			// console.log(list)
			return list.map(item=>{
				// console.log(item)
				res.push(item)
			})
		})
		console.log(res)
		//Shuffle all the news items
		shuffleArray(res);		
		let output = "";
		for(let i = 0; i < res.length; i++){
			let link =  res[i].url;
			//Translate each word in title
			let title = [];
			let title_news = res[i].title;
			let titlesplit = title_news.split(" ");
			for (var j in titlesplit){
				let word = getIgbo(j);
				title.push(word)
			}
			let title = title.toString();//Convert title list to text
			let description = [];
			let news_description = res[i].description;
			let descriptionsplit = news_description.split(" ");
			for (var k in descriptionsplit){
				let word_ = getIgbo(k);
				description.push(word_)
			}
			let description = description.toString();
			let resultDiv = `
				<div class="col-sm-4 col-md-4">
					<div class="thumbnail">
						<img src="${res[i].urlToImage}" alt="${title}" class="img-responsive">
						<div class="caption">
							<h2> ${title} </h2>
							<h4> ${description} </h4>
							<p><a href="${link}" target="_blank" class="btn btn-primary" role="button">View Article</a> </p>
						</div>
					</div>
				</div>	`
			output += resultDiv;
		}
		$('.printResults').html(output);
	}	

	function shuffleArray(array){
	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
	}
});

//  LocalWords:  href
