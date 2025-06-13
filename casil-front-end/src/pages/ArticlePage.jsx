import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchArticleByName } from '../services/ArticleService';
import '../styles/ArticlePage.css';

function ArticlePage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArticle = async () => {
      try {
        const response = await fetchArticleByName(name);
        setArticle(response.data);
      } catch (error) {
        console.error("Failed to fetch article:", error);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    getArticle();
  }, [name]);

  if (loading) return <p>Loading...</p>;

  if (!article) {
    return (
      <div className="article-page">
        <div className="article-box">
          <h1>Article Not Found</h1>
          <p>The article you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="article-page">
      <div className="article-box">
        <h1>{article.title}</h1>
        <br />
        {article.content.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </div>
    </div>
  );
}

export default ArticlePage;
