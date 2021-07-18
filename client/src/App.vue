<template>
      <div>
            <navbar
                  v-if="isLogin"
                  @logoutClick="logout"
                  @eventBackFood="backToFood"
                  @eventBackCategory="backToCategory"
                  @eventBackHistory="backToHistory">
            </navbar>
            <login
                  v-if="pageLocation === 'login'"
                  @eventLogin="login"
                  @pageTo="movePage">
            </login>
            <table-food
                  v-if="pageLocation === 'food'"
                  :foods="sendDataFood"
                  @eventFoodUpdate="updateFoodStatus"
                  @eventEditItem="editFood"
                  @eventDeleteItem="deleteFood"
                  @eventAddItem="addFood">
            </table-food>
            <register
                  v-if="pageLocation === 'register'"
                  @eventRegister="register"
                  @pageTo="movePage">
            </register>
            <edit-food-data
                  v-if="pageLocation === 'edit-food-data'"
                  :food="sendDataFood"
                  @eventUpdateFood="updateFood"
                  @eventBackFood="backToFood">
            </edit-food-data>
            <table-category
            v-if="pageLocation === 'category'"
            :categories="categories">
            </table-category>
            <table-history
                  :histories="sendDataHistory"
                  v-if="pageLocation === 'history'">
            </table-history>
            <add-food-data
                  v-if="pageLocation === 'add-food'"
                  @eventBackFood="backToFood"
                  @eventAddFood="addFoodPost">
            </add-food-data>
      </div>
</template>

<script>
import axios from './apis/server'
import Navbar from "./components/Navbar.vue"
import Login from "./components/Login.vue"
import Register from "./components/Register.vue"
import TableFood from "./components/TableFood.vue"
import EditFoodData from "./components/EditFoodData.vue"
import AddFoodData from "./components/AddFoodData.vue"
import TableCategory from "./components/TableCategory.vue"
import TableHistory from "./components/TableHistory.vue"

export default {
      name: "App",
      components: {
            Navbar,
            Login,
            Register,
            TableFood,
            EditFoodData,
            AddFoodData,
            TableCategory,
            TableHistory
      },
      computed: {
            pageLocation: function() {
                  return this.currentPage;
            },
            sendDataHistory: function() {
                  return this.histories;
            },
            sendDataFood: function() {
                  return this.foods;
            },
            sendDataCategory: function() {
                  return this.categories;
            }
      },
      created() {
            if (localStorage.getItem('access_token')) {
                  this.isLogin = true
                  this.currentPage = "food"
                  this.getData()
            }
      },
      data() {
            return {
                  foods: [],
                  categories: [],
                  histories: [],
                  isLogin: false,
                  currentPage: "login",
            }
      },
      methods: {
            getData() {
                  axios({
                        method: 'get',
                        url: '/foods',
                        headers: {
                              access_token: localStorage.getItem('access_token')
                        }
                  })
                        .then(response => {
                              this.foods = response.data.data;
                        })
                        .catch(error => {
                              console.log(error)
                        })
            },
            getCategories() {
                  axios({
                        method: 'get',
                        url: '/categories',
                        headers: {
                              access_token: localStorage.getItem('access_token')
                        }
                  })
                        .then(response => {
                              this.categories= response.data.data;
                        })
                        .catch(error => {
                              console.log(error)
                        })
            },
            login(dataLogin) {
                  axios({
                        url: '/login',
                        method: 'POST',
                        data: dataLogin
                  })
                        .then(response => {
                              localStorage.setItem('access_token', response.data.access_token);
                              this.isLogin = true;
                              this.currentPage = "food"
                              this.getData()
                              Swal.fire({
                                    icon: 'success',
                                    title: 'Login',
                                    text: 'Your login successfully',
                                    timer: 2000,
                                    showConfirmButton: false,
                              })
                        })
                        .catch(error => {
                              Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Your email or password wrong!',
                                    timer: 2000,
                                    showConfirmButton: false,
                              })
                        })
            },    
            register(dataRegister) {
                  axios({
                        url: '/register',
                        method: 'POST',
                        data: dataRegister
                  })
                        .then(response => {
                              this.currentPage = "login"
                              Swal.fire({
                                    icon: 'success',
                                    title: 'Register',
                                    text: 'Register account successfully',
                                    timer: 2000,
                                    showConfirmButton: false,
                              })
                        })
                        .catch(error => {
                              Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Please enter data correctly!',
                                    timer: 2000,
                                    showConfirmButton: false,
                              })
                        })
            },
            menuSelected(result) {
                  this.currentPage = result;
            },
            logout(){
                  localStorage.removeItem('access_token')
                  this.isLogin = false
                  this.currentPage = "login"
                  this.foods = [];
                  this.categories = [];
                  this.histories = [];
                  Swal.fire({
                        icon: 'success',
                        title: 'Logout',
                        text: 'Logout account successfully',
                        timer: 2000,
                        showConfirmButton: false,
                  })
            },
            movePage(pageTo){
                  this.currentPage = pageTo;
            },
            foodMenu(event) {
                  this.currentPage = event;
            },
            updateFoodStatus(event) {
                  axios({
                        method: 'PATCH',
                        url: `/foods/update-status/${event.id}`,
                        data: {
                              status: event.status
                        },
                        headers: {
                              access_token: localStorage.getItem('access_token')
                        }
                  })
                        .then(response => {
                              this.status = event.status;
                        })
                        .catch(error => {
                              console.log(error);
                        }) 
            },
            getFootById(id) {
                  axios({
                        method: 'get',
                        url: `/foods/${id}`,
                        headers: {
                              access_token: localStorage.getItem('access_token')
                        }
                  })
                        .then(response => {
                              this.foods = response.data.data;
                              this.currentPage = "edit-food-data";
                        })
                        .catch(error => {
                              Swal.fire({
                                    icon: 'error',
                                    title: 'Not Access',
                                    text: 'You do not have access',
                                    timer: 2000,
                                    showConfirmButton: false,
                              })
                        })
            },
            editFood(event) {
                  this.getFootById(event);
            },
            updateFood(event) {
                  axios({
                        url: `/foods/update/${ event.id }`,
                        method: 'PUT',
                        headers: {
                              access_token: localStorage.getItem('access_token')
                        },
                        data: event.formData
                  })
                        .then(response => {
                              Swal.fire({
                                    icon: 'success',
                                    title: 'Update Food',
                                    text: 'updated food successfully',
                                    timer: 2000,
                                    showConfirmButton: false,
                              })
                              this.currentPage = "food"
                              this.getData()
                        })
                        .catch(error => {
                              Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Please enter data correctly!',
                                    timer: 2000,
                                    showConfirmButton: false,
                              })
                        })
            },
            addFoodPost(event) {
                  console.log('Masuk 2');
                  console.log(event);
                  axios({
                        url: `/foods/create`,
                        method: 'POST',
                        data: event,
                        headers: {
                              access_token: localStorage.getItem('access_token')
                        }
                  })
                        .then(response => {
                              console.log('masuk 3');
                              Swal.fire({
                                    icon: 'success',
                                    title: 'Add Food',
                                    text: 'Add food successfully',
                                    timer: 2000,
                                    showConfirmButton: false,
                              })
                              this.currentPage = "food"
                              this.getData()
                        })
                        .catch(error => {
                              console.log('error guys');
                              Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Please enter data correctly!',
                                    timer: 2000,
                                    showConfirmButton: false,
                              })
                        })
            },
            getHistories() {
                  axios({
                        url: '/histories',
                        method: 'GET',
                        headers: {
                              access_token: localStorage.getItem('access_token')
                        }
                  })
                        .then(response => {
                              this.histories = response.data.data;
                        })
            },
            backToFood(event) {
                  this.currentPage = event;
                  this.getData();
            },
            backToCategory(event) {
                  this.currentPage = event;
                  this.foods = [];
                  this.getCategories();
            },
            backToHistory(event) {
                  this.currentPage = event;
                  this.foods = [];
                  this.getHistories();
            },
            deleteFood(id) {
                  axios({
                        url: `/foods/delete/${id}`,
                        method: 'DELETE',
                        headers: {
                              access_token: localStorage.getItem('access_token')
                        }
                  })
                        .then(response => {
                              this.foods = [];
                              this.currentPage = "category";
                              this.backToFood("food");
                              Swal.fire({
                                    icon: 'success',
                                    title: 'Delete Access',
                                    text: 'Deleted food successfully',
                                    timer: 2000,
                                    showConfirmButton: false,
                              })
                        })
                        .catch(error => {
                              Swal.fire({
                                    icon: 'error',
                                    title: 'Not Access',
                                    text: 'You do not have access',
                                    timer: 2000,
                                    showConfirmButton: false,
                              })
                        })
            },
            addFood(event) {
                  this.currentPage = event;
                  this.categories = [];
                  this.foods = [];
            }
      }
}
</script>

<style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300&display=swap');
      body{
            background-color:rgb(247, 247, 247);
            font-family: 'Poppins', sans-serif;
      }
</style>