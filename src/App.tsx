import type { Component } from 'solid-js';
import { Routes, Route, A, useLocation, useNavigate } from "@solidjs/router";
import { Show } from 'solid-js';

import Classic from './pages/Classic';
import Rounds from './pages/Rounds';

import logo from './logo.png';

import { BiRegularArrowBack } from 'solid-icons/bi'

const App: Component = () => {
  return (
    <div class="container mx-auto bg-slate-800">
      <header class="p-2 flex flex-row items-center">
        <Show when={useLocation().pathname != "/"}>
          <div class="mx-1 h-12 w-12 bg-slate-700 flex flex-row items-center justify-center rounded-md">
            <A href="/">
              <BiRegularArrowBack size={24} color={"white"} />
            </A>
          </div>
        </Show>
        <div class="h-12 mx-1 bg-slate-700 flex flex-row items-center w-fit rounded-md">
          <img src={logo} class="p-1 h-12" alt="logo" />
          <h1 class='m-1 p-1 font-semibold text-white'>Magic Hat</h1>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/classic" component={Classic} />
          <Route path="/rounds" component={Rounds} />
          <Route path="/" component={Home} />
        </Routes>
      </main>
      <footer class="fixed left-0 bottom-0 text-white p-2 max-sm:w-full max-sm:text-center">
        <p>
          Made by&nbsp;
          <a class="underline" href="https://hatchibombotar.com">Hatchibombotar</a>
        </p>
      </footer>
    </div>
  );
};


const Home: Component = () => {
  const navigate = useNavigate()
  return <div class="p-2">
    <p>Add items to a hat and take them out in a random order.</p>
    <div class="bg-white text-black mx-1 my-4 py-2 px-4 rounded-md border border-transparent cursor-pointer" onclick={() => navigate("/classic")}>
      <h2 class="font-medium">Classic</h2>
      <p>Pick items out of the hat one by one.</p>
    </div>
    <div class="bg-white text-black mx-1 my-4 py-2 px-4 rounded-md border border-transparent cursor-pointer" onclick={() => navigate("/rounds")}>
      <h2 class="font-medium">Rounds</h2>
      <p>Pick items in rounds. The chance of getting two items consecutively is lower.</p>
    </div>
  </div>
}


export default App;
