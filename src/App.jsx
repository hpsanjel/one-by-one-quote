import React, { useState, useEffect } from "react";
import "./App.css";

const colors = ["#16a085", "#165f34", "#1b334b", "#c47c08", "#a62213", "#8b3fa9", "#df4843", "#382325", "#472a2f", "#908a19", "#157064", "#367d10"];

function App() {
	const [quotesData, setQuotesData] = useState([]);
	const [currentQuote, setCurrentQuote] = useState("");
	const [currentAuthor, setCurrentAuthor] = useState("");
	const [color, setColor] = useState(colors[0]);
	const [imageUrl, setImageUrl] = useState("https://picsum.photos/552/200");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function fetchQuotes() {
			const response = await fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json");
			const jsonQuotes = await response.json();
			setQuotesData(jsonQuotes.quotes);
			getQuote(jsonQuotes.quotes);
		}
		fetchQuotes();
		setImageUrl(imageUrl);
	}, []);

	const getRandomQuote = (quotes) => {
		return quotes[Math.floor(Math.random() * quotes.length)];
	};

	const getQuote = (quotes = quotesData) => {
		let randomQuote = getRandomQuote(quotes);

		setCurrentQuote(randomQuote.quote);
		setCurrentAuthor(randomQuote.author);

		const newColor = colors[Math.floor(Math.random() * colors.length)];
		setColor(newColor);

		document.body.style.backgroundColor = newColor;
		document.body.style.color = newColor;

		setLoading(true);

		const newImageUrl = `https://picsum.photos/552/200?random=${new Date().getTime()}`;
		setImageUrl(newImageUrl);

		const img = new Image();
		img.src = newImageUrl;
		img.onload = () => {
			setLoading(false);
		};
	};

	return (
		<div id="quote-box">
			<img src={imageUrl} alt="Random" style={{ width: "552px", height: "200px", display: loading ? "none" : "block" }} />
			{loading && <div>Loading...</div>}{" "}
			<p id="text" style={{ opacity: 1 }}>
				{currentQuote}
			</p>
			<p id="author" style={{ opacity: 1 }}>
				- {currentAuthor}
			</p>
			<div className="footer">
				<button type="submit" className="quote-button" id="new-quote" onClick={() => getQuote()} style={{ backgroundColor: color }}>
					<p>New Quote</p>
				</button>
				<button type="submit" className="quote-button" id="tweet-quote">
					<p>Tweet Quote</p>
				</button>
			</div>
		</div>
	);
}

export default App;
