import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Container } from "@material-ui/core";
import { deleteItem } from "redux/action";
import Header from "./header";
import { useEffect } from "react";
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

function Cart(data) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const classes = useStyles();
    useEffect(() => {
        let ldata = localStorage.authTask && JSON.parse(localStorage.authTask);
        !ldata && navigate("/dashbord", { replace: true })
      },[]);
  const goToDelete=(a)=>{
    try {
        dispatch(deleteItem(a))
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <>
      <Header />
      <div>
        {data.listData?.map((a, i) => (
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
                <h4>{`Qty : ${a.qnt}`}</h4>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={()=>goToDelete(a)}
                >
                  Remove Item
                </Button>
              </Grid>
            </Grid>
          </Container>
        ))}
       {data.listData.length===0&&  <Container className={classes.container} maxWidth="md">
         <Grid container spacing={20} alignItems="center">
         <Grid item xs={12}>
            <h4>{"Your Cart Is Impty!"}</h4>
         </Grid>
         </Grid>
          </Container>}
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
    deleteItem: (payload) => dispatch(deleteItem(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
