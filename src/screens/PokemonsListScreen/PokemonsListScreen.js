import React from 'react';

import { observer } from 'mobx-react-lite';

import { Layout, PageHeader, Pagination } from 'antd';

import { useStores } from '../../hooks/use-stores';
import PokemonsList from '../../components/PokemonsList';

const { Header, Footer, Content } = Layout;

const PokemonsListScreen = observer(() => {
  const { pokemonsStore } = useStores();
  const totalItems = pokemonsStore.count;
  const fetchPokemons = pokemonsStore.fetchPokemons;

  const changePage = (pageNumber, pageSize) => {
    fetchPokemons(pageNumber, pageSize);
  };

  return (
    <Layout>
      <Header>Header</Header>
      <Content>
        <PageHeader
          className='site-page-header-responsive'
          onBack={() => window.history.back()}
          title='Pokedex'
        >
          <Content>
            <Pagination
              total={totalItems}
              defaultPageSize={20}
              defaultCurrent={1}
              onChange={changePage}
            />
          </Content>
        </PageHeader>
        <PokemonsList />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
});

export default PokemonsListScreen;
