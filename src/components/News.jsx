import { useState, useEffect } from "react";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import Loader from "./Loader";

import { Typography, Row, Col, Card, Input } from "antd";
import moment from "moment";

const News = ({ simplified }) => {
  var { data: cryptosNewsList, isLoading } = useGetCryptoNewsQuery();
  const [cryptoNews, setCryptoNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const dummyImage =
    "https://hesolutions.com.pk/wp-content/uploads/2019/01/picture-not-available.jpg";
  const dummyDescription =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint com";

  useEffect(() => {
    cryptosNewsList = simplified
      ? cryptosNewsList?.data.slice(0, 6)
      : cryptosNewsList?.data;

    const filteredData = cryptosNewsList?.filter((news) =>
      news.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptoNews(filteredData);
  }, [cryptosNewsList, searchTerm]);

  if (isLoading) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Crypto News"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[24, 24]}>
        {cryptoNews?.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card
              hoverable
              className="news-card"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <div className="news-image-container">
                  <img src={news?.thumbnail || dummyImage} alt="news" />
                </div>
                <Typography.Title className="news-title" level={4}>
                  {news.title}
                </Typography.Title>
                <p style={{ marginBottom: "1em" }}>
                  {news?.description.length > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description || dummyDescription}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p syle={{ marginBottom: "0px !important" }}>
                  {moment(news?.createdAt).fromNow()}
                </p>
                <div>
                  <a href={news.url} target="_blank" rel="noreferrer">
                    Click to know more
                  </a>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
