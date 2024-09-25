import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Modal, Button, Form, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedCategory]);

  const fetchProducts = async () => {
    setLoading(true); 
    const query = `?search=${searchTerm}&category=${selectedCategory}`;
    const res = await axios.get(`https://ecom-be-rpq6.onrender.com/api/products${query}`);
    setProducts(res.data);
    setLoading(false); 
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleCategoryFilter = (e) => setSelectedCategory(e.target.value);
  const handleModalClose = () => setModalData(null);
  const handleProductClick = (product) => setModalData(product);

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h1 className="text-center">ECommerce Landing Page</h1>
          <Form.Control
            type="text"
            placeholder="Search Products..."
            value={searchTerm}
            onChange={handleSearch}
            className="mb-3 rounded-pill shadow-sm"
          />
          <Form.Select onChange={handleCategoryFilter} value={selectedCategory} className="mb-3 rounded-pill shadow-sm">
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="home appliances">Home Appliances</option>
          </Form.Select>
        </Col>
      </Row>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row>
          {products.map((product) => (
            <Col md={4} key={product._id}>
              <Card onClick={() => handleProductClick(product)} className="mb-4 product-card">
                <Card.Img variant="top" src={product.image} className="product-image" />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>${product.price}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {modalData && (
        <Modal show={true} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>{modalData.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={modalData.image} alt={modalData.title} className="img-fluid mb-3" />
            <p>{modalData.description}</p>
            <p>Price: ${modalData.price}</p>
            <p>Available Quantity: {modalData.quantity}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default App;
