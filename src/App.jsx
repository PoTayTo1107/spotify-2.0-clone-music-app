import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from 'styled-theming';

import { Searchbar, Sidebar, MusicPlayer, TopPlay } from './components';
import { ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails, TopCharts } from './pages';
import { subscribe, preferences } from './redux/features/themeSlice';

export const backgroundColor = theme('theme', {
    light: 'blue',
    dark: 'black'
});

export const textColor = theme('theme', {
    light: 'white',
    dark: 'black'
});

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
    background-color: ${backgroundColor};
    color: ${textColor};
`;

const App = () => {
    const { activeSong } = useSelector((state) => state.player);
    const darkThemeEnabled = useSelector((state) => state.theme.value);

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(preferences());
        dispatch(subscribe());
    };

    return (
        <ThemeProvider theme={{ theme: darkThemeEnabled ? 'dark' : 'light' }}>
            <Container>
                <div className="relative flex">
                    <Sidebar />
                    <div className="flex-1 flex flex-col">
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
                                <TopPlay />
                            </div>
                        </div>
                    </div>

                    {activeSong?.title && (
                        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
                            <MusicPlayer />
                        </div>
                    )}
                </div>
                <p>
                    <input type="checkbox" checked={darkThemeEnabled} onChange={handleClick} />
                    <span>Use Dark Theme</span>
                </p>
            </Container>
        </ThemeProvider>
    );
};

export default App;
