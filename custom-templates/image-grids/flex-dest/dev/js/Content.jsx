import React, { useCallback } from 'react';
import PhotoGridWithHeader from './PhotoGridWithHeader';

export default function Content({
  assetData,
  currentAsset,
  gridImages,
  isLoading,
  onClickImage,
  photoEdits,
  selectedListing,
  selectedImageIdx,
  setIsLoading,
  setSelectedListing,
  setSelectedImageIdx,
}) {
  const handleSkip = useCallback(() => {
    setSelectedListing();
    setSelectedImageIdx();
    setIsLoading(true);
    Labelbox.skip().then(() => {
      Labelbox.fetchNextAssetToLabel();
    });
  }, []);

  const handleSubmit = useCallback(() => {
    setSelectedListing();
    setSelectedImageIdx();
    const jumpToNext = !currentAsset?.label;

    if (jumpToNext) {
      setIsLoading(true);
    }
    Labelbox.setLabelForAsset(label, 'ANY').then(() => {
      if (jumpToNext) {
        Labelbox.fetchNextAssetToLabel();
      }
    });
  }, []);

  return (
    <div className="content">
      <div id="asset">
        {isLoading ? (
          'loading...'
        ) : (
          <PhotoGridWithHeader
            assetData={assetData}
            gridImages={gridImages}
            onClickImage={onClickImage}
            photoEdits={photoEdits}
            selectedListing={selectedListing}
            selectedImageIdx={selectedImageIdx}
          />
        )}
      </div>
      <div className="flex-column questions">
        <div id="questions" />
        <div className="flex-grow" />
        <div style={{ display: 'flex' }}>
          <a
            className="waves-effect waves-light btn-large skip-button"
            onClick={handleSkip}
          >
            Skip
          </a>
          <a
            className="waves-effect waves-light btn-large submit-button"
            onClick={handleSubmit}
          >
            Submit
          </a>
        </div>
      </div>
    </div>
  );
}
