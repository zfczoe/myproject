function Blog(title, content, author,blogSort) {
	this.title = title; 
	this.content = content;
	this.author = author;
	this.blogSort = blogSort;  //文章种类
	this.readCount = 0;
}

module.exports = Blog;