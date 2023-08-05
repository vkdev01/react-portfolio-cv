import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import Article from "../components/articles/article";

import INFO from "../data/user";
import SEO from "../data/seo";
//import myArticles from "../data/articles";

import "./styles/articles.css";


const Articles = () => {
	const [articlesList, setArticleList] = useState([
		{
		  title: 'Introduction to Stacks and Queues',
		  author: 'vaibhav kumar',
		  date: 'Sun, 11 Jul 2021 12:33:53 GMT',
		  link: 'https://vaibhavkumar.hashnode.dev/introduction-to-stacks-and-queues',
		  summary: 'Stack\n' +
			'A stack is an ordered list (Data Structure) in which all insertion and deletion are done at one end. It is a First In Last Out (FILO). Top is a pointer pointing to the top most element of the stack.\n' +
			'Applications of Stack\n' +
			'Recursion\n' +
			'Post fix eval'
		},
		{
		  title: 'A new way of Scraping the Web: Requests-HTML',
		  author: 'vaibhav kumar',
		  date: 'Fri, 08 Jan 2021 18:31:51 GMT',
		  link: 'https://vaibhavkumar.hashnode.dev/a-new-way-of-scraping-the-web-requests-html',
		  summary: 'Most of us when think about doing web scraping and HTML parsing using python, we use tools like beautiful-soup, scrapy, regular expressions etc. \n' +
			'In this article, I will show you the basics of web scraping with Requests-HTML library, by Kenneth Reitz'
		},
		{
		  title: 'Introduction to Image Classification using CNNs in PyTorch',
		  author: 'vaibhav kumar',
		  date: 'Thu, 31 Dec 2020 14:32:04 GMT',
		  link: 'https://vaibhavkumar.hashnode.dev/introduction-to-image-classification-using-cnns-in-pytorch',
		  summary: 'In this article, we will learn about using CNNs in PyTorch. We will use the standard CIFAR10 dataset and perform image classification on it.\n' +
			'Importing Libraries\n' +
			'import torch\n' +
			'import matplotlib.pyplot as plt\n' +
			'import numpy as np\n' +
			'\n' +
			'Data loading\n' +
			'import torc'
		},
		{
		  title: 'Feed Forward Networks using PyTorch',
		  author: 'vaibhav kumar',
		  date: 'Tue, 29 Dec 2020 17:47:49 GMT',
		  link: 'https://vaibhavkumar.hashnode.dev/feed-forward-networks-using-pytorch',
		  summary: 'In this article, we will see in how many ways we can implement Feed Forword Neural Networks in PyTorch. For this we will be using a three neurons network that takes two input features and gives output through the last neuron as shown in fig.\n' +
			'\n' +
			'Importi'
		},
		{
		  title: 'Ridge Regression using Neural Network',
		  author: 'vaibhav kumar',
		  date: 'Tue, 29 Dec 2020 14:23:50 GMT',
		  link: 'https://vaibhavkumar.hashnode.dev/ridge-regression-using-neural-network',
		  summary: 'In this article, we are going learn how to use ridge regression algorithm using neural networks and then compare the results we get with an RidgeRegressor model that comes built-in sklearn module.\n' +
			'import numpy as np \n' +
			'import matplotlib.pyplot as plt\n' +
			'\n'
		},
		{
		  title: 'Working with Hashnode RSS feed in Python',
		  author: 'vaibhav kumar',
		  date: 'Mon, 28 Dec 2020 15:59:28 GMT',
		  link: 'https://vaibhavkumar.hashnode.dev/working-with-hashnode-rss-feed-in-python',
		  summary: 'In article, we will be seeing how extract feed and posts details using RSS feed for a Hashnode blog. Although we are going to use it for blogs on [Hashnode] it can be used for other feeds as well\n' +
			'What is RSS?\n' +
			'RSS stands for Rich Site Summary or Reall'
		},
		{
		  title: 'Concatenating PDF files using Python',
		  author: 'vaibhav kumar',
		  date: 'Tue, 22 Dec 2020 11:18:13 GMT',
		  link: 'https://vaibhavkumar.hashnode.dev/concatenating-pdf-files-using-python',
		  summary: "Sometimes we have to deal with multiple PDF files and I've seen often that people want if pdfs can be merged or concatenated as one single file.\n" +
			'We can do that with Python thanks to the PyPDF2 library, which is a very handy tool when it comes to work'
		},
		{
		  title: 'Building a Command Line File Downloader in Python',
		  author: 'vaibhav kumar',
		  date: 'Tue, 22 Dec 2020 08:00:37 GMT',
		  link: 'https://vaibhavkumar.hashnode.dev/building-a-command-line-file-downloader-in-python',
		  summary: 'Python is one of the most popular general purpose programming language with a wide range of use cases from general coding to complex fields like AI.\n' +
			'One of the reason for such popularity of python as a programming language is the availablility of man'
		},
		{
		  title: 'Neural Style Tranfer',
		  author: 'vaibhav kumar',
		  date: 'Wed, 16 Dec 2020 17:45:14 GMT',
		  link: 'https://vaibhavkumar.hashnode.dev/neural-style-tranfer',
		  summary: 'What is Neural Style Transfer?\n' +
			'It is a process of applying a new artistic style on an existing original image by using a pre-trained neural network, usually a convolutional neural network. e.g, AlexNet, VGG19, SqueezeNet etc.\n' +
			'How does it works?\n' +
			'Take '
		},
		{
		  title: 'Introduction to Generative-Adversarial Networks(GANs) using PyTorch',
		  author: 'vaibhav kumar',
		  date: 'Tue, 15 Dec 2020 14:56:17 GMT',
		  link: 'https://vaibhavkumar.hashnode.dev/introduction-to-generative-adversarial-networksgans-using-pytorch',
		  summary: 'What are GANs?\n' +
			'It stands for Generative-Adversarial Networks. Consists of two neural networks contesting against each other.\n' +
			'These GANs can be used to generate real looking pictures and videos of virtually anything.\n' +
			'Two contesting neural networks are'
		}
	  ]
	  );


	useEffect(() => {
		window.scrollTo(0, 0);

		// const get_data = async () => {
		// 	const data = await getArticles();

		// 	setArticleList(data);
		// }

		// get_data();
		// console.log(articlesList);

	}, []);


	// const getArticles = async function () {
	// 	const url = "https://vaibhavkumar.hashnode.dev/rss.xml";

	// 	const html = await fetch(url);
	// 	const data = await html.text();
	// 	const feed = await new RSSParser().parseString(data);

	// 	const articles = [];

	// 	for (let post of feed.items) {
	// 		const article = {
	// 			title: post.title,
	// 			author: post.creator,
	// 			date: post.pubDate,
	// 			link: post.link,
	// 			summary: post.contentSnippet.slice(0, 250)
	// 		};
	// 		articles.push(article);
	// 	}

	// 	return articles;
	// }

	const currentSEO = SEO.find((item) => item.page === "articles");

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Articles | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="articles" />
				<div className="content-wrapper">
					<div className="articles-logo-container">
						<div className="articles-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="articles-main-container">
						<div className="title articles-title">
							{INFO.articles.title}
						</div>

						<div className="subtitle articles-subtitle">
							{INFO.articles.description}
						</div>

						<div className="articles-container">
							<div className="articles-wrapper">
								{articlesList.map((article, index) => (
									<div
										className="articles-article"
										key={(index + 1).toString()}
									>
										<Article
											key={(index + 1).toString()}
											date={article.date}
											title={article.title}
											description={article.summary}
											link={article.link}
										/>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className="page-footer">
						<Footer />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Articles;
