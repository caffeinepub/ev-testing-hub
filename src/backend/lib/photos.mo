// lib/photos.mo
// Handles uploading raw photo blobs to object-storage and returns file IDs.
// Depends on the caffeineai-object-storage mops package.

import Runtime "mo:core/Runtime";

module {
  /// Upload a batch of raw photo blobs to object-storage.
  /// Returns the resulting file IDs that can be stored in a TestRecord.
  public func uploadPhotos(
    photos : [Blob],
  ) : async [Text] {
    Runtime.trap("not implemented");
  };

  /// Resolve a list of file IDs to public photo URLs for display.
  public func resolvePhotoUrls(
    photoIds : [Text],
  ) : async [Text] {
    Runtime.trap("not implemented");
  };
};
