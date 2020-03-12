import React, { useState, useEffect } from "react";
import { Menu, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUserData, updateDisplayedUser } from "../../actions/mapActions";
import axios from "axios";

const FriendListView = props => {
  const [friendState, setFriendState] = useState({
    ...props,
    friends: [],
    filteredFriends: [],
    query: ""
  });

  useEffect(async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/users`)
      .then(res => {
        const friends = res.data.users.filter(user => {
          return user.fb_user_id !== window.localStorage.getItem("SAMUserID");
        });
        setFriendState({
          friends: friends,
          filteredFriends: friends
          // clickedFriend: window.localStorage.getItem("SAMUserID")
        });
        // this.props.getUserData(window.localStorage.getItem("SAMUserID"));
      });
  });

  const onChangeHandler = ({ target }) => {
    const res = friendState.friends.filter(friend => {
      const name =
        friend.first_name.toLowerCase() + " " + friend.last_name.toLowerCase();
      return name.includes(target.value.toLowerCase());
    });
    setFriendState({
      filteredFriends: res,
      query: target.value
    });
  };

  // friendHandler = user => {
  //   console.log(user.fb_user_id);
  // };

  return (
    <div>
      {window.localStorage.getItem("SAMUserID") ? (
        <div className="friend-view-wrapper">
          <input
            className="search-bar"
            placeholder="Search Friends        &#x1f50d; &nbsp;"
            onChange={e => onChangeHandler()}
            value={friendState.query}
          />
          <Menu
            inverted
            style={{
              display: "flex",
              flexDirection: "column",
              overflow: "auto",
              height: 425
            }}
            className="friend-card-list"
          >
            {friendState.filteredFriends.map(friend => {
              return (
                <Menu.Item
                  as="a"
                  className="friendCard"
                  key={friend.id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start"
                  }}
                >
                  <div
                    style={{ marginLeft: 75 }}
                    onClick={() =>
                      friendState.updateDisplayedUser(friend.fb_user_id)
                    }
                  >
                    <Image
                      style={{ fontSize: 27 }}
                      src="http://placekitten.com/200/200"
                      avatar
                    />
                    <span style={{ fontSize: 16, marginLeft: 10 }}>
                      {friend.first_name} {friend.last_name}
                    </span>
                  </div>
                </Menu.Item>
              );
            })}
          </Menu>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userData: state.getUserDataReducer.userData,
    userCountryData: state.getUserDataReducer.userCountryData,
    loading: state.getUserDataReducer.loading,
    DBUserID: state.getUserDataReducer.id
  };
};
export default withRouter(
  connect(mapStateToProps, { getUserData, updateDisplayedUser })(FriendListView)
);
