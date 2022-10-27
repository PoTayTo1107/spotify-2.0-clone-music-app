import { useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Searchbar, Sidebar, MusicPlayer, TopPlay } from './components';
import { ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails, TopCharts } from './pages';

const App = () => {
    const dispatch = useDispatch();
    const { activeSong } = useSelector((state) => state.player);

    const persistedState = localStorage.getItem('location');
    const initialState = persistedState ? JSON.parse(persistedState) : 'Discover';
    const reducer = (state, action) => {
        switch (action) {
            case 'Discover': {
                localStorage.setItem('location', JSON.stringify('Discover'));
                return 'Discover';
            }
            case 'Around You': {
                localStorage.setItem('location', JSON.stringify('Around You'));
                return 'Around You';
            }
            case 'Top Artists': {
                localStorage.setItem('location', JSON.stringify('Top Artists'));
                return 'Top Artists';
            }
            case 'Top Charts': {
                localStorage.setItem('location', JSON.stringify('Top Charts'));
                return 'Top Charts';
            }
            default:
                return state;
        }
    };

    const [location, setLocation] = useReducer(reducer, initialState);

    return (
        <div className="relative flex">
            <Sidebar location={location} setLocation={setLocation} />
            <div className="flex-1 flex flex-col dark:bg-gradient-to-br dark:from-black dark:to-[#121286] dark:text-white bg-gradient-to-br from-[#483d8b] to-[#EAECC6] text-black">
                <Searchbar />
                <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
                    <div className="flex-1 h-fit pb-40">
                        <Routes>
                            <Route path="/" element={<Discover />} />
                            <Route path="/top-artists" element={<TopArtists />} />
                            <Route path="/top-charts" element={<TopCharts />} />
                            <Route path="/around-you" element={<AroundYou />} />
                            <Route path="/artists/:id" element={<ArtistDetails />} />
                            <Route path="/songs/:songid" element={<SongDetails />} />
                            <Route path="/search/:searchTerm" element={<Search />} />
                        </Routes>
                    </div>
                    <div className="xl:sticky relative top-0 h-fit">
                        <TopPlay setLocation={setLocation} />
                    </div>
                </div>
            </div>

            {activeSong?.title && (
                <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 dark:to-[#2a2a80]to-[#5A5092] backdrop-blur-lg rounded-t-3xl z-10">
                    <MusicPlayer />
                </div>
            )}
        </div>
    );
};

export default App;
