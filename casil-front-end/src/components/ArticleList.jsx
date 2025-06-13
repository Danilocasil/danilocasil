import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchArticles } from '../services/ArticleService';
import '../styles/Article-List.css'; 

function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await fetchArticles();
        setArticles(response.data); 
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };

    getArticles();
  }, []);

  return (
    <div className="article-list">
      {Array.isArray(articles) && articles.map(a => (
        <div key={a.name} className="article-preview">
          <Link to={`/articles/${a.name}`}>
            <h3>{a.title}</h3>
            <p>{a.content?.[0]?.substring(0, 150)}...</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ArticleList;
