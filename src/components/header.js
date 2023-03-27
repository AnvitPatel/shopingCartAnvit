import React from "react";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { ShoppingCartOutlined, ArrowBack } from "@material-ui/icons";
import { Chip } from "@material-ui/core";
const useStyles = makeStyles({
  toolbar: {
    textAlign: "center",
    height: 80,
    marginLeft: "auto",
  },
  marginR: {
    marginRight: "0.5em",
  },
  heading: {
    margin: "auto",
  },
});
const Header = ({ listData }) => {
  const pathName = window.location.pathname;
  const classes = useStyles();
  const navigate = useNavigate();
  const goToCart = () => navigate(`/cart`);
  const logout = () => {
    try {
      localStorage.removeItem("authTask");
      navigate(`/login`);
    } catch (error) {
      console.log(error);
    }
  };
  let q = 0;
  listData?.forEach((element) => {
    q = q + element.qnt;
  });
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        {pathName !== "/cart" ? (
          <Chip
            icon={<ShoppingCartOutlined />}
            onClick={goToCart}
            label={q}
            className={classes.marginR}
          />
        ) : (
          <Chip
            icon={<ArrowBack />}
            onClick={() => navigate(`/dashbord`)}
            className={classes.marginR}
          />
        )}
        <Chip label="Logout" onClick={logout} />
      </Toolbar>
    </AppBar>
  );
};
const mapStateToProps = (state) => {
  return {
    listData: state.operation.items,
  };
};
const mapDispatchToProps = (dispatch) => {
 
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);

