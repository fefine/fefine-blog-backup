// show md
let 
	main = document.getElementsByTagName('main')[0],
	page = 0,
	next_btn = document.createElement('div'),
init = function () {
	addClass(next_btn, 'next');
	next_btn.innerText = 'More';
	next_btn.addEventListener('click', next_page);
},
next_page = function() {
	page += 1;
	next_btn.remove();
	get_blogs(page);
},
single_blog = function() {
	let hash = window.location.hash.replace('#', ''),
		url = '/blog/name/' + hash + '.do',
		$ = (el)=>{return document.getElementById(el)};
	get_Json(url, function(res) {
		if (res.status === 200) {
			let blog = res.data;
			$('a-title').innerText = blog.info.title;
			$('a-label').innerText = decodeURIComponent(blog.info.tags) + ' | ' + blog.info.dateTime;
			show_str(blog.content, $('a-body'));
		} else {
			$('a-title').innerText = 'Error';
			$('a-label').innerText = 'error';
			$('a-body').innerText = '（╯\' - \')╯︵ ┻━┻';
		}
	}, function(err) {
			$('a-title').innerText = 'Error';
			$('a-label').innerText = 'error';
			$('a-body').innerText = '（╯\' - \')╯︵ ┻━┻';
	})
},
show_str = function(txt, preview) {
	preview.innerHTML = markdown.toHTML(txt);
},

show = function(input, preview) {
	show_str(input.value, preview);
},

get_blogs = function(page) {
	//console.log('page is:' + page);
	let url = '/blog/page/' + page + '.do';
	get_Json(url, function(res) {
	//	console.log(res);
		if (res.status === 200) {
			show_blogs(res.data);
		} else {
			// no more
			console.error('get blog error' + res.msg);
		}
	}, function(err) {
		console.error(err);
	})
},

get_Json = function(url, success, failed) {
	$.ajax({
		url: url,
		success: function (res) {
			success(res);
		},
		error: function(err) {
			failed(err);
		}
	})
}

show_blogs = function(blogs) {
	// if (main.hasChildNodes(next_btn)) {
		// main.removeChild(next_btn);		
	// }
	blogs.forEach(function(blog) {
		let article = create_blog(blog.name, blog.title, blog.tags, blog.dateTime, blog.summary);
		main.appendChild(article);
	});
	main.appendChild(next_btn);
},

create_blog = function (name, title, labels, dateTime, content) {
	let article = document.createElement('article'),
		header_div = document.createElement('div'),
		title_div = document.createElement('div'),
		title_a = document.createElement('a'),
		label_div = document.createElement('div'),
		body_div = document.createElement('div'),
		footer_div = document.createElement('div'),
		footer_a = document.createElement('a'),
		url = '/single.html#' + name;
//	console.log('url:' + url);

	addClass(header_div, 'a-header');
	addClass(title_div, 'a-title');
	addClass(label_div, 'a-label');
	addClass(body_div, 'a-body');
	addClass(footer_div, 'a-footer');
	addClass(footer_a, 'read-more');

	article.appendChild(header_div);
		header_div.appendChild(title_div);
			title_div.appendChild(title_a);
				// set url
				setAttr('href')(title_a, url);
				title_a.innerText = title;
		header_div.appendChild(label_div);
			label_div.innerText = decodeURIComponent(labels) + ' | ' + dateTime;
	article.appendChild(body_div);
		show_str(content, body_div);
		// body_div.innerText = content;
	article.appendChild(footer_div);
		footer_div.appendChild(footer_a);
		setAttr('href')(footer_a, url);
		footer_a.innerText = 'Raed More';
	return article;
},

setAttr = function (attr_name) {
	return function(ele, attr_value) {
		if (ele.getAttribute(attr_name) != null) {
			attr_value += (' ' + ele.getAttribute(attr_name));
		}
		ele.setAttribute(attr_name, attr_value);
	}
},

addClass = function(ele, attr_value) {
	return setAttr('class')(ele, attr_value);
};
