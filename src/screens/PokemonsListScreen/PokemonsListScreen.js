import React from 'react';

import { Layout, PageHeader } from 'antd';

import PokemonsList from '../../components/PokemonsList';

const { Header, Footer, Content } = Layout;

const PokemonsListScreen = () => {
  return (
    <Layout>
      <Header>Header</Header>
      <Content>
        <PageHeader
          className='site-page-header-responsive'
          onBack={() => window.history.back()}
          title='Pokedex'
        >
          <Content></Content>
        </PageHeader>
        <PokemonsList />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default PokemonsListScreen;
