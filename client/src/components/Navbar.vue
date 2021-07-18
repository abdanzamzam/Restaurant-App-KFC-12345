<template>
  <div>
       <vs-sidebar
      right
      v-model="active"
      open
      >
      <template #logo>
        ...
      </template>
      <template #header>
        
      </template>
      <vs-sidebar-item id="foods">
        <template #icon>
          <i class="fas fa-hamburger"></i>
        </template>
        <a @click.prevent="foodMenu">Foods</a>
      </vs-sidebar-item>
      <vs-sidebar-item id="categories">
        <template #icon>
          <i class="fas fa-clipboard-list"></i>
        </template>
        <a @click.prevent="categoryMenu">Categories</a>
      </vs-sidebar-item>
      <vs-sidebar-item id="histories">
        <template #icon>
          <i class="fas fa-history"></i>
        </template>
        <a @click.prevent="historyMenu">Histories</a>
      </vs-sidebar-item>
      <vs-sidebar-item id="logout">
        <template #icon>
          <i class="fas fa-sign-out-alt"></i>
        </template>
        <a @click="logoutMenu">Logout</a>
      </vs-sidebar-item>
      <template #footer>
        <vs-row>
          <vs-avatar>
            <img src="https://pbs.twimg.com/profile_images/1303645505465974785/BAedfmOT.jpg" alt="">
          </vs-avatar>
          <p style="margin-left:10px; padding: 10px;"><b>Hacktiv8 Bootcamp</b></p>
        </vs-row>
      </template>
    </vs-sidebar>
  </div>
</template>

<script>
export default {
     name: 'Navbar',
     data(){
       return {
         active: "foods",
       }
     },
     methods: {
       logoutMenu() {
         this.$emit("logoutClick", true)
       },
       foodMenu() {
         this.$emit("eventBackFood", "food")
       },
       categoryMenu() {
         this.$emit("eventBackCategory", "category")
       }, 
       historyMenu() {
         this.$emit("eventBackHistory", "history")
       }
     }
}
</script>

<style>
  .content-food {
    margin: 30px;
  }
</style>