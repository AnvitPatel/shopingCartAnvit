import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  Container,
} from "@material-ui/core";
import { addItem } from "redux/action";
import Header from "./header";
var arraylist = [
  {
    id: 1,
    img: "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/315vs3rLEZL._SY445_SX342_QL70_FMwebp_.jpg",
    price: "1,00,000",
    name: "i phone",
    qnt:1,
  },
  {
    id: 2,
    img: "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/41WpkxwZ+WL._SY300_SX300_.jpg",
    price: "70,000",
    name: "Samsung",
    qnt:1,
  },
  {
    id: 3,
    img: "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/414+xRBltFL._SY300_SX300_.jpg",
    price: "35,000",
    name: "One Plus",
    qnt:1,
  },
  {
    id: 4,
    img: "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/41Ml+bxR8UL._SY300_SX300_.jpg",
    price: "20,000",
    name: "Vivo",
    qnt:1,
  },
];
const useStyles = makeStyles({
  container: {
    marginTop: 16,
    marginBottom: 16,
    padding: 16,
    boxShadow:
      "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
  },
  button: {
    marginTop: 16,
  },
});

function TodoList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const goToAdd = (value) => {
    dispatch(addItem(value))
  };
  useEffect(() => {
    let ldata = localStorage.authTask && JSON.parse(localStorage.authTask);
    !ldata && navigate("/login", { replace: true });
  }, []);

  return (
    <>
      <Header />
      <div>
        {arraylist?.map((a, i) => (
          <Container className={classes.container} maxWidth="md">
            <Grid container spacing={20} alignItems="center">
              <Grid item xs={4}>
                <div>
                  <img src={a.img} width="200" height="200" />
                </div>
              </Grid>
              <Grid item xs={4}>
                <h4>{a.name}</h4>
                <h4>{`Deal : ${a.price}`}</h4>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  color="primary"
                   onClick={()=>goToAdd(a)}
                >
                  Add to Cart
                </Button>
              </Grid>
            </Grid>
          </Container>
        ))}
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    listData: state.operation.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (payload) => dispatch(addItem(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
