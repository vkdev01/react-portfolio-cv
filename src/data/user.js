const INFO = {
	main: {
		title: "React CV-Portfolio",
		name: "Vaibhav Kumar",
		email: "",
		logo: "../logo.png",
	},

	about_me:
`const vaibhav = {
  pronouns: "He" | "Him",
  code: ["Javascript", "Python", "C/C++", "Typescript"],
  askMeAbout: ["web dev", "full stack", "deep learning", ""],
  technologies: {
	backEnd: {
	  js: ["Node", "Fastify", "Express"],
	  python: ["FastAPI", "Django", "flask"],
	},
	mobileApp: {
	  native: ["Android Development"]
	},
	devOps: ["AWS", "Docker🐳", "Nginx"],
	databases: ["mongo", "MySql", "sqlite", "PostgreSQL"],
	ML/DL: ["PyTorch", "Scikit-Learn", ]
	misc: ["Firebase", "Socket.IO", "selenium", "open-cv", "php", "SuiteApp"]
  },
  architecture: ["Serverless Architecture", "Microservices", "Single page applications"],
  currentFocus: "Actively Working",
  funFact: "There are two ways to write error-free programs; only the third one works"
};`,

	socials: {
		github: "https://github.com/vkdev01",
		linkedin: "https://www.linkedin.com/in/vaibhav-kumar-vk/",
		stackoverflow: "https://stackoverflow.com/",
		hashnode: "https://vaibhavkumar.hashnode.dev",
		hackerrank: "https://www.hackerrank.com/dev_kumar01?hr_r=1",
		leetcode: "https://leetcode.com/vaibhavk01"
	},

	homepage: {
		title: "Full Stack Web Developer, ML Engineer or beginner level Designer",
		description:
			"I am a versatilist and easily adapt to different hats depending on what the project requires. I love exploring new tech stack computer and leveraging them to build cool stuffs and reliable web applications using various frameworks and technologies. I enjoy solving problems and learning new skills. I am passionate about writing quality code that follows best practices and industry standards. I am always looking for new challenges and opportunities to grow as a developer.",
	},

	about: {
		title: "I'm Vaibhav Kumar",
		description:
			"I've worked on a variety of projects over the years and I'm proud of the progress I've made. Many of these projects are open-source and available for others to explore and contribute to. If you're interested in any of the projects I've worked on, please feel free to check out the code and suggest any improvements or enhancements you might have in mind. Collaborating with others is a great way to learn and grow, and I'm always open to new ideas and feedback.",
	},

	articles: {
		title: "I'm passionate about learning new things and technologies and using them to see of what's possible and their applications",
		description:
			"Chronological collection of my writings on Programming, Machine Learning, Data Structures and more.",
	},
	// https://devicon.dev
	projects: [
		{
			title: "FastAPI OCR API / Microservice",
			description:
				"A RESI API / microservice using FastAPI and PyTessearact",
			logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original-wordmark.svg",
			github_link: "https://github.com/vkdev01/ocr-ms-fastapi",
			live_link: ""
		},

		{
			title: "Crawler OCR",
			description:
				"An Programm which automatically crawls a list of links and perform OCR to extract text. Built using python and pytesseract",
			logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
			github_link: "https://github.com/vkdev01/Extractor-Assignment/tree/master/pdf-extractor",
			live_link: ""
		},

		{
			title: "Realtime Chat Application",
			description:
				"Realtime Chat Application using node.js (Express and Socket.io)",
			logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
			github_link: "https://github.com/vkdev01/realtime-chat-app",
			live_link: "https://realtime-chat-app.vaibhavkumar109.repl.co/"
		},

		{
			title: "Flask Blog Application",
			description:
				"A Blog Web application built using python and Flask",
			logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
			github_link: "https://github.com/vkdev01/FlaskCodeBlog",
			live_link: ""
		},

		{
			title: "Github Profile Finder",
			description:
				"A React SPA to find github profiles using Github API and react.js",
			logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
			github_link: "https://github.com",
			live_link: ""
		},
	],
};

export default INFO;
