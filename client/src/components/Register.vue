<template>
     <div class="grid">
          <vs-row align="center" justify="center">
               <div class="card-login" shadow>
                    <div class="text-header">
                         <h2>REGISTER</h2>
                    </div>
                    <form action="" @submit.prevent="register">
                         <vs-input primary block class="input" type="text" v-model="user.name" placeholder="Name">
                              <template #icon><i class="fas fa-user"></i></template>
                         </vs-input>
                         <vs-input primary block class="input" type="text" v-model="user.email" placeholder="Email">
                              <template #icon><i class="fas fa-envelope"></i></template>
                         </vs-input>
                         <vs-input primary block class="input" type="password" v-model="user.password" placeholder="Password">
                              <template #icon><i class="fas fa-lock"></i></template>
                         </vs-input>
                         <vs-button class="btn-submit" block>Register Now</vs-button>
                         <div class="text-button">
                              <div>Already have an account? <a href="" @click.prevent="movePage">Login</a></div>
                         </div>
                    </form>
               </div>
          </vs-row>
    </div>
</template>

<script>
export default {
     name: "Register",
     data() {
          return {
               user: {
                    name: "",
                    email: "",
                    password: "",
               }
          }
     },
     methods: {
          movePage() {
               this.$emit("pageTo", "login")
          },
          register() {
               this.$emit("eventRegister", this.user)
               this.user.name = "";
               this.user.email = "";
               this.user.password = "";
          }
     }
}
</script>

<style>
     .card-login {
          margin-top: 150px;
          width: 300px;
          height: auto;
          border: 1px;
          padding-top: 5px;
          padding-right: 20px;
          padding-left: 20px;
          background-color: white;
          border-radius: 10px;
          -webkit-box-shadow: 0px 7px 29px -22px rgba(0,0,0,0.75);
          -moz-box-shadow: 0px 7px 29px -22px rgba(0,0,0,0.75);
          box-shadow: 0px 7px 29px -22px rgba(0,0,0,0.75);
     }
     .btn-submit {
          margin-top: 15px;
          padding: 3px;
     }
     .text-button {
          margin-top: 10px;
          font-size: 12px;
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
     }
     .text-button a {
          text-decoration: none;
          margin-top: 10px;
     }
     .text-header {
          display: flex;
          justify-content: center;
          margin: 20px;
     }
     .input {
          margin-top:15px;
          margin-bottom: 15px
     }
</style>