<template>
    <div class="grid">
          <vs-row align="center" justify="center">
               <div class="card-login" shadow>
                    <div class="text-header">
                         <h2>LOGIN</h2>
                    </div>
                    <form action="" v-on:submit.prevent=login>
                         <vs-input v-model="user.email" primary block placeholder="Email">
                              <template #icon><i class="fas fa-envelope"></i></template>
                         </vs-input><br/>
                         <vs-input v-model="user.password" primary block type="password" placeholder="Password">
                              <template #icon><i class="fas fa-lock"></i></template>
                         </vs-input>
                         <vs-button class="btn-submit" block>Sign In</vs-button>
                         <div class="text-button">
                              <div>New Here? <a href="" @click.prevent="movePage">Create New Account</a></div>
                         </div>
                    </form>
               </div>
          </vs-row>
    </div>
</template>

<script>
export default {
     name: "Login",
     data()  {
          return {
               user : {
                    email: "",
                    password: "",
               }
          }
     },
     methods: {
          login() {
               this.$emit("eventLogin", this.user)
               this.user.email = "";
               this.user.password = "";
          },
          movePage() {
               this.$emit("pageTo", "register")
          }
     }
}
</script>

<style scoped>
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
</style>