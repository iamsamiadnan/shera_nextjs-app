import Image from "next/image";

export default function Home() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <div className="p-6 bg-white text-black rounded w-xl">
                    <header className="mb-6">
                        <h1 className="text-3xl mb-4">Taskify List 📝</h1>

                        <form action="" className="flex">
                            <input
                                type="text"
                                className="border border-r-0 rounded rounded-r-none h-9 flex-1 px-6 hover:outline-0 focus:outline-0"
                            />
                            <input
                                type="submit"
                                value="Add"
                                className="hover:cursor-pointer hover:bg-amber-500 h-9 bg-amber-600 rounded text-white px-9 border border-black relative right-0.5"
                            />
                        </form>
                    </header>

                    {/* task list container */}
                    <div>
                        <ul className="flex flex-col gap-4">
                            <li className="flex justify-between hover:opacity-75 ">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 mr-4 hover:cursor-pointer"
                                    />
                                    <span className="text-xl ">
                                        Learn javascript project
                                    </span>{" "}
                                </div>
                                <button className="hover:cursor-pointer">
                                    ❌
                                </button>
                            </li>
                            <li className="flex justify-between hover:opacity-75 ">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 mr-4 hover:cursor-pointer"
                                    />
                                    <span className="text-xl line-through">
                                        Learn javascript project
                                    </span>{" "}
                                </div>
                                <button className="hover:cursor-pointer">
                                    ❌
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
}
