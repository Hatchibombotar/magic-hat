import type { Component } from 'solid-js';
import { For, createSignal, Show } from 'solid-js';

import { VsChromeClose } from 'solid-icons/vs'

type ItemList = [string, number][]

const [hat, setHat] = createSignal<ItemList>([
    ["", 1] 
])

const [workingHat, setWorkingHat] = createSignal<string[]>([])

const [revealingResults, setToReveal] = createSignal(false)
const [currentIndex, setCurrentIndex] = createSignal<number>(0)

const Classic: Component = () => {
    return (
        <div class="bg-slate-800 flex flex-col items-center mb-16">
            <div class="mb-10">
                <Show when={!revealingResults()}>
                    <ItemConfig />
                    <p class="underline cursor-pointer text-center w-fit mx-auto my-2" onclick={() => {
                        if (!confirm("Are you sure you want to reset the hat's contents?")) return

                        setHat([
                            ["", 1]
                        ])
                    }}>
                        Reset
                    </p>
                </Show>

                <Show when={revealingResults()}>
                    <Results />
                </Show>

                <Show when={!revealingResults()}>
                    <div class="my-10 flex flex-col items-center fixed bottom-0 left-0 w-full">
                        <button class="m-1  shadow-2xl shadow-black text-black bg-white rounded-md border border-transparent py-2 px-4" type="button" onclick={() => {
                            setWorkingHat(
                                shuffle(
                                    expandHat(hat())
                                )
                            )
                            setToReveal(true)
                            setCurrentIndex(0)
                        }}> Pick things out of the hat!</button>
                    </div>
                </Show>
            </div>
        </div>
    )
}

const removeIndex = (array: any[], index: number) => array.filter(
    (_value, itemIndex) => itemIndex != index
)

const ItemConfig: Component = () => {
    return <div>
        <h2 class='text-white px-2'>Items</h2>
        <For each={hat()}>{([key, amount], index) =>
            <div class="flex">
                <input class="text-black bg-white rounded-md border border-transparent py-2 px-4 m-1   w-full" type="text" value={key} onInput={(event) => {
                    const value = event.target.value
                    const currentHat = hat()
                    currentHat[index()][0] = value
                    setHat(currentHat)
                }}></input>
                <input class="text-black bg-white rounded-md border border-transparent py-2 px-4 m-1  w-16 text-center" type="number" value={amount} min="0" max="100" onInput={(event) => {
                    const value = Number(event.target.value)
                    const currentHat = hat()
                    currentHat[index()][1] = value
                    setHat(currentHat)
                }}></input>
                <button class="text-black bg-white rounded-md border border-transparent m-1 w-10 h-10 text-center  aspect-square" type="button" onclick={() => {
                    setHat(
                        removeIndex(hat(), index())
                    )
                }}>
                    <VsChromeClose class="mx-auto" />
                </button>
            </div>
        }</For>
        <div class="flex flex-col items-center">
            <button class=" m-1  text-black bg-white rounded-md border border-transparent py-2 px-4" type="button" onclick={(event) => {
                setHat([
                    ...hat(),
                    ["", 1]
                ])
                event.currentTarget.scrollIntoView()
            }}>Add Item</button>
        </div>
    </div>
}

function shuffle(array: any[]) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function expandHat(hat: ItemList) {
    const newHat = []
    for (const [item, quantity] of hat) {
        for (let index = 0; index < quantity; index++) {
            newHat.push(item)
        }
    }
    return newHat
}

const Results: Component = () => {
    const [resultShown, setResultVisability] = createSignal(false)
    return <div>
        <Show when={resultShown()} fallback={
            <p class="text-white text-md mt-24 italic text-center">
                Press "View Item" to pick an item out of the hat.
            </p>
        }>
            <p class="text-white font-semibold text-3xl mt-24">
                {workingHat()[currentIndex()]}
            </p>
        </Show>
        <div class="my-10 flex flex-col items-center fixed bottom-0 left-0 w-full">
            <button class=" m-1   shadow-2xl shadow-black font-medium text-black bg-white rounded-md border border-transparent py-2 px-4" type="button" onclick={() => {
                if (currentIndex() >= workingHat().length) {
                    setToReveal(false)
                    return
                }
                if (resultShown()) {
                    setCurrentIndex(currentIndex() + 1)
                }
                setResultVisability(!resultShown())
            }}> {resultShown() ? "Next Item" : "View Item"}</button>
        </div>
    </div>
}

export default Classic