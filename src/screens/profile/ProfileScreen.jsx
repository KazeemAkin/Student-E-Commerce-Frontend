/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "../../components/navbar/Navbar";
import ProfileHeader from "./ProfileHeader";

// api
import userApi from '../../api/User';

// css
import "./Profile.css";
import Listings from "../Index/Listings";
import Ratings from "./Ratings";
import Footer from "../../components/footer/Footer";
import { useUserGuard } from "../../hooks/UserGuard";
import { Dialog } from "primereact/dialog";
import colors from "../../config/colors";
import { FaImage } from "react-icons/fa";
import { Button } from "primereact/button";
import { useRef, useState } from "react";
import { empty, prepareResponseData } from "../../Utilities/utils";
import { ROUTE_PROFILE } from "../../config/constants";

function ProfileScreen() {
  useUserGuard();
  const fileInputRef = useRef(null);
  const [displayImageModal, setDisplayImageModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState('');
  const toastTR = useRef(null);

  // alert functions
  const responseDialog = (severity = null, summary = null, detail = null) => {
    toastTR?.current?.show({
      severity,
      summary,
      detail,
      life: 8000,
    });
  };

  /**
   * Function to upload avatar
   * @returns 
   */
  const uploadAvatar = async () => {
    try {
      if (!isLoading) setIsLoading(true);

      const response = await userApi.uploadAvatar({ avatar });
      const response_data = prepareResponseData(response);
      if (!response_data.success) {
        return responseDialog(
          "error",
          "Error Alert",
          !empty(response_data) && !empty(response_data.response)
            ? response_data.response
            : `Failed to upload avatar!`,
        );
      }

      responseDialog(
        "success",
        "Success",
        `Avatar uploaded successfully.`,
      );
      setDisplayImageModal(false);
      setTimeout(() => {
        window.location.href = ROUTE_PROFILE
      }, 2000)
    } catch (error) {
      responseDialog("error", "Error Alert", "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  // Function to trigger the hidden file input click
  const handleImageFilePickUp = () => {
    fileInputRef?.current?.click();
  };

  // Function to handle the selected file
  const handleFileUpload = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();

        // Convert file to Base64 when the file is loaded
        reader.onloadend = async () => {
          const base64String = reader.result;
          setAvatar(base64String);
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {}
  };


  const uploadImageModal = (
    <div className="flex justify-center mt-30">
      <Button
        label="Update"
        style={{
          backgroundColor: colors.primary,
          color: colors.white,
          borderColor: colors.primary,
          borderWidth: 1,
          height: 40,
          width: 120,
          fontSize: 14,
          fontWeight: 200
        }}
        onClick={() => uploadAvatar()}
      />
    </div>
  );

  const openUserAvatarModal = () => {
    setDisplayImageModal(true);
  }

  return (
    <section className="main-wrapper profile-page">
      <Navbar active_screen="" />

      {/* profile header section */}
      <ProfileHeader openAvatarModal={openUserAvatarModal} />

      {/* listings */}
      <Listings title="Listed Items" is_user_list={true} />

      {/* Ratings */}
      <Ratings />

      {/* footer */}
      <Footer />

      <Dialog
        visible={displayImageModal}
        style={{ width: "52rem", zIndex: 999999 }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        modal
        footer={uploadImageModal}
        onHide={() => setDisplayImageModal(false)}
      >
        <div
          className="confirmation-content mt-10"
        >
          <div className="preview-image">
            <div className="image-preview-box" onClick={handleImageFilePickUp}>
              {empty(avatar) ? (
                <FaImage size={95} />
              ) : (
                <img src={avatar} alt="preview" />
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              style={{ display: "none" }}
              accept="image/*"
            />
          </div>
        </div>
      </Dialog>
    </section>
  );
}

export default ProfileScreen;
