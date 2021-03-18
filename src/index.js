import { CacheProvider, NetworkErrorBoundary } from 'rest-hooks';
import React, { Suspense, useContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import './App.scss';
import reportWebVitals from './reportWebVitals';
import PokemonIndexView from './views/PokemonIndexView'
import PokemonShowView from './views/PokemonShowView'
import useThemeSettings from './hooks/useThemeSettings';
import ThemeContextProvider, { ThemeContext } from './context/theme'


const NoMatch = () => (<div>Not found</div>)
const Spinner = () => (<div>Spinner</div>)

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={PokemonIndexView} />
      <Route exact path="/pokemon" component={PokemonIndexView} />
      <Route exact path="/pokemon/page/:page" component={PokemonIndexView} />
      <Route path="/pokemon/:pokemonName" component={PokemonShowView} />
      <Route component={NoMatch} />
    </Switch>
  </BrowserRouter>
)

ReactDOM.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <CacheProvider>
        <Header />
        <Suspense fallback={<Spinner />}>
          <NetworkErrorBoundary>
            <Router />
          </NetworkErrorBoundary>
        </Suspense>
      </CacheProvider>
    </ThemeContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <div onClick={() => { toggleTheme() }}>
      Header {theme}
    </div>
  )
}
