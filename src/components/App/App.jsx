import { useEffect, useState } from "react";

import "./App.css";
import AddItemModal from "../AddItemModal/AddItemModal";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Main from "../Main/Main";
//import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Profile from "../Profile/Profile";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, apiKey } from "../../utils/constants";
import { getItems, addNewItem, deleteItemById } from "../../utils/Api";
import { CurrentTemperatureUnitContext } from "../../utils/contexts/CurrentTemperatureUnitContext";
import React from "react";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as auth from "../../utils/auth/auth";
import * as api from "../../utils/Api";
import { setToken, getToken, removeToken } from "../../utils/token";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditPofileModal from "../EditProfileModal/EditProfileModal";
import { CurrentUserContext } from "../../utils/contexts/CurrentUserContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [defaultClothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    username: "",
    name: "",
    avatar: "",
  });
  const navigate = useNavigate();

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };
  const handleAddClick = () => {
    console.log("gggggggggggggggggggggggggggggg");
    setActiveModal("add-garment"); //something is wrong here
    console.log("bruhhhhh");
  };
  const handleRegisterClick = () => {
    setActiveModal("sign-up");
  };
  const handleLoginClick = () => {
    setActiveModal("log-in");
  };
  const handleEditClick = () => {
    setActiveModal("edit-profile");
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return;
    function handleClickOffModal(event) {
      if (event.target.classList.contains("modal")) {
        closeActiveModal();
      }
    }

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("click", handleClickOffModal); //need to define this
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("click", handleClickOffModal);
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  const handleRegistration = (email, password, name, avatar) => {
    auth
      .register(email, password, name, avatar)
      .then((data) => {
        console.log("Register API Response: ", data);

        if (data.user) {
          setCurrentUser({ name: data.user.name, avatar: data.user.avatar });
          navigate("/profile");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((data) => {
        console.log("Login API Response: ", data);
        setToken(data.token);
        setIsLoggedIn(true);
        return api.getUserInfo(data.token);
      })
      .then((data) => {
        console.log(data);
        if (data.user) {
          setCurrentUser({ name: data.user.name, avatar: data.user.avatar });
          closeActiveModal();
          navigate("/profile");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    console.log("CurrentUser State: ", currentUser);
  }, [currentUser]);

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    api
      .getUserInfo(jwt)
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res);
      })
      .catch(console.error);
  }, [isLoggedIn]);

  const handleLogOut = () => {
    removeToken();
    navigate("/");
    setIsLoggedIn(false);
    setCurrentUser({});
  };

  const handleEditProfile = (name, avatar) => {
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    api
      .updateUserInfo(name, avatar, jwt)
      .then((data) => {
        setCurrentUser(data);
        closeActiveModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // changed res.data to data

  useEffect(() => {
    getItems()
      .then(({ data }) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  const onAddNewItem = async ({ name, imageUrl, weather }) => {
    //destructure the object to get the values
    const jwt = getToken(); //retrieve the token
    return addNewItem(name, imageUrl, weather, jwt) //pass all 4 values
      .then((item) => {
        setClothingItems([item.data, ...defaultClothingItems]); //update clothing items
        //resetForm(); //reset
        closeActiveModal(); //close
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCardLike = ({ _id, isLiked }) => {
    const id = _id;
    const jwt = getToken();
    !isLiked
      ? api
          .addCardLike(id, jwt)
          .then((updatedCard) => {
            const updatedDefaultClothingItems = defaultClothingItems.map(
              (item) => (item._id === id ? updatedCard.data : item)
            );
            setClothingItems(updatedDefaultClothingItems);
          })
          .catch((error) => {
            console.error(error);
          })
      : api
          .removeCardLike(id, jwt)
          .then((updatedCard) => {
            const updatedDefaultClothingItems =
              defaultClothingItemsClothingItems.map((item) =>
                item._id === id ? updatedCard.data : item
              );
            setClothingItems(updatedDefaultClothingItems);
          })
          .catch((error) => {
            console.error(error);
          });
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        console.log("weather");
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  const handleDelete = async (id) => {
    const jwt = getToken();
    try {
      await deleteItemById(id, jwt);
      const updatedDefaultClothingItems = defaultClothingItems.filter(
        (item) => item._id !== id
      );
      setClothingItems(updatedDefaultClothingItems);
      closeActiveModal();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleRegisterClick={handleRegisterClick}
              handleLoginClick={handleLoginClick}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    defaultClothingItems={defaultClothingItems}
                    handleAddClick={handleAddClick}
                    isLoggedIn={isLoggedIn}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    {currentUser ? (
                      <Profile
                        handleCardClick={handleCardClick}
                        defaultClothingItems={defaultClothingItems}
                        handleAddClick={handleAddClick}
                        handleEditClick={handleEditClick}
                        handleLogOut={handleLogOut}
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={setIsLoggedIn}
                        name={currentUser.name}
                        avatar={currentUser.avatar}
                        onCardLike={handleCardLike}
                      />
                    ) : (
                      <div>Loading...</div>
                    )}
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>

          <AddItemModal
            onClick={handleAddClick}
            activeModal={activeModal}
            handleCloseModal={closeActiveModal}
            onAddNewItem={onAddNewItem}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            closeActiveModal={closeActiveModal}
            handleDeleteItem={handleDelete}
          />
          <RegisterModal
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            handleRegistration={handleRegistration}
            handleLoginClick={handleLoginClick}
          />
          <LoginModal
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            handleLogin={handleLogin}
            handleRegisterClick={handleRegisterClick}
          />
          <EditPofileModal
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            handleEditProfile={handleEditProfile}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
