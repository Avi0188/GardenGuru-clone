import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../Redux/Products/action';
import ProductCard from './ProductCard';
import { styled } from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function ProductList() {
  const [searchParams] = useSearchParams();
  const products = useSelector((store) => store.productReducer.products);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(products)
    const obj = {
      params: {
        _sort: searchParams.get('order') === 'price' ? 'price' : null,
        _order: searchParams.get('order') === 'price' ? 'asc' : null,
      },
    };
    dispatch(getProducts(obj));
  }, [searchParams, dispatch]);
  

  return (
    <DIV>
        <div>
            <Sidebar/>
        </div>
      {products.length > 0 &&
        products.map((product) => {
          return <ProductCard key={product._id} {...product} />;
        })}
    </DIV>
  );
}

const DIV = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;
