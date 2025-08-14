import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import Header from '../../components/Header/Header'
// TODO: (Andrew) Format Page

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <SearchBar />
    </div>
  );
};

export default Home;