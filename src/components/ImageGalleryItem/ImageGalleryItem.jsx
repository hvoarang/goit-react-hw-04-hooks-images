import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'components/Spinner/Spinner';
import { Modal } from 'components/Modal/Modal';
import { LoadMoreBtn } from 'components/LoadMoreBtn/LoadMoreBtn';
import { Container } from 'components/App/App.styled';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

const Status = {
	IDLE: 'idle',
	PENDING: 'pending',
	RESOLVED: 'resolved',
};

export const ImageGalleryItem = props => {
	const { pictureName, page, handleLoadMore } = props;
	const [picture, setPicture] = useState([]);
	const [status, setStatus] = useState(Status.IDLE);
	const [showModal, setShowModal] = useState(false);
	const [modalPicture, setModalPicture] = useState(null);
	useEffect(() => {
		setStatus(Status.PENDING);
		fetch(
			`https://pixabay.com/api/?key=30188336-4b4f26bd7e50c24034d7e6b40&q=${pictureName}&page=${page}&per_page=20`
		)
			.then(r => r.json())
			.then(images => {
				if (pictureName === '') {
					setStatus(Status.IDLE);
					return;
				}
				page > 1
					? setPicture(prevImg => [...prevImg, ...images.hits])
					: setPicture(images.hits);

				setTimeout(() => {
					if (page > 1) {
						onScroll();
					}
				}, 400);
				setStatus(Status.RESOLVED);
			})
			.catch(error => console.log(error));
	}, [pictureName, page]);

	const toggleModal = URL => {
		setShowModal(!showModal);
		setModalPicture(URL);
	};

	const onScroll = () => {
		window.scrollBy({
			top: window.innerHeight,
			behavior: 'smooth',
		});
	};
	const markUp = picture?.map(({ tags, largeImageURL }) => (
		<GalleryItem key={largeImageURL}>
			<GalleryImage
				src={largeImageURL}
				alt={tags}
				width="280"
				height="260"
				onClick={() => toggleModal(largeImageURL)}
			/>
		</GalleryItem>
	));
	return (
		<>
			<Container>
				{status === 'idle' && <h1>Please enter the search query</h1>}
				{status === 'pending' && <Spinner />}
			</Container>
			{markUp}
			{picture.length ? <LoadMoreBtn onClick={handleLoadMore} /> : null}
			{showModal && <Modal onClose={toggleModal} largeImage={modalPicture} />}
		</>
	);
};

ImageGalleryItem.propTypes = {
	pictureName: PropTypes.string.isRequired,
	page: PropTypes.number.isRequired,
	handleLoadMore: PropTypes.func.isRequired,
};
