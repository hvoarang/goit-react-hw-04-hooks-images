import { useState } from 'react';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { Container } from './App.styled';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
	const [pictureName, setPictureName] = useState('');
	const [page, setPage] = useState(1);

	const handleFormSubmit = pictureName => {
		setPictureName(pictureName);
		setPage(1);
	};

	const handleLoadMore = () => {
		setPage(pPage => pPage + 1);
	};

	return (
		<>
			<SearchBar onSubmit={handleFormSubmit} />
			<Container>
				<ImageGallery>
					<ImageGalleryItem
						pictureName={pictureName}
						page={page}
						handleLoadMore={handleLoadMore}
					/>
				</ImageGallery>
				<ToastContainer autoClose={3000} position={'top-left'} />
			</Container>
			;
		</>
	);
};
