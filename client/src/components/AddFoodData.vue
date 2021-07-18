<template>
     <div class="main-content">
          <div class="center content-inputs">
               <div class="title-form">
                    <h3>ADD FOOD</h3>
               </div>
               <form action="" v-on:submit.prevent="submitForm">
                    <label>Name</label>
                    <vs-input placeholder="Name" block primary v-model="addFood.name">
                         <template #icon>
                              <i class="fas fa-pizza-slice"></i>
                         </template>
                    </vs-input>
                    <label>Description</label>
                    <vs-input placeholder="Description" block primary v-model="addFood.description">
                         <template #icon>
                              <i class="fas fa-scroll"></i>
                         </template>
                    </vs-input>
                    <label>Price</label>
                    <vs-input placeholder="Price" block primary v-model="addFood.price">
                         <template #icon>
                              <i class="fas fa-dollar-sign"></i>
                         </template>
                    </vs-input>
                    <span style="font-size:11px">* Minimum price: $ 1000</span><br/>
                    <div
                         class="imagePreviewWrapper"
                         :style="{ 'background-image': `url(${previewImage})` }"
                         @click="selectImage">
                    </div>
                    <label>Image</label>
                    <div class="input-image">
                         <input ref="fileInput" type="file" @input="pickFile"><br/>
                    </div>
                    <span style="font-size:11px">* When editing, you have to re-upload the food image</span><br/>
                    <label>Category</label>
                    <vs-select placeholder="Select" v-model="addFood.category" block color="primary">
                         <vs-option label="Special" value="1">
                              Special
                         </vs-option>
                         <vs-option label="Kombo" value="2">
                              Kombo
                         </vs-option>
                         <vs-option label="Praktis" value="3">
                              Praktis
                         </vs-option>
                         <vs-option label="Sides" value="4">
                              Sides
                         </vs-option>
                         <vs-option label="Kids Meal" value="5">
                              Kids Meal
                         </vs-option>
                         <vs-option label="Breakfast" value="6">
                              Breakfast
                         </vs-option>
                         <vs-option label="Drinks" value="7">
                              Drinks
                         </vs-option>
                    </vs-select>
                    <vs-button class="btn-submit" size="xl" block color="primary" type="submit">ADD DATA FOOD</vs-button>
                    <vs-button class="btn-back" size="xl" block color="danger" v-on:click.prevent="backMenu">BACK TO FOOD</vs-button>
               </form>
          </div>
     </div>
</template>

<script>
export default {
     name: 'AddFoodData',
     data () {
          return {
               previewImage: null,
               addFood: {
                    category: "",
                    name: "",
                    description: "",
                    price: "",
                    imgUrl: "",
               }
          }
     },
     methods: {
          selectImage () {
               this.$refs.fileInput.click()
          },
          pickFile () {
               let input = this.$refs.fileInput
               let file = input.files
               if (file && file[0]) {
                    let reader = new FileReader
                    reader.onload = e => {
                    this.previewImage = e.target.result
                    }
                    reader.readAsDataURL(file[0])
                    this.addFood.imgUrl = file[0]
               }
          },
          submitForm() {
               let formData = new FormData()
               formData.append('name', this.addFood.name)
               formData.append('description', this.addFood.description)
               formData.append('price', this.addFood.price)
               formData.append('imgUrl', this.addFood.imgUrl)
               formData.append('categoryId', this.addFood.category)
               this.$emit("eventAddFood", formData)
          },
          backMenu() {
               this.$emit("eventBackFood", "food")
          }
     }
}
</script>

<style scoped>
     .main-content {
         margin: 50px;
         margin-right: 315px;
         background-color: white;
         padding: 20px;
         padding-top: 30px;
         padding-left: 40px;
         padding-right: 40px;
         border-radius: 15px;
         padding-bottom: 30px;
         -webkit-box-shadow: 0px 7px 29px -22px rgba(0,0,0,0.75);
          -moz-box-shadow: 0px 7px 29px -22px rgba(0,0,0,0.75);
          box-shadow: 0px 7px 29px -22px rgba(0,0,0,0.75);
     }
     label {
          font-size: 13px;
          margin-bottom: 2px;
          margin-left: 5px;
          margin-top: 15px;
     }
     .title-form {
          display: flex;
          justify-content: center;
          margin-top: 10px;
     }
     .imagePreviewWrapper {
          width: 200px;
          height: 200px;
          display: block;
          border-radius: 12px;
          margin-top: 20px;
          cursor: pointer;
          background-size: cover;
          background-position: center center;
     }
     .input-image{
          display: block;
          border-radius: 10px;
          padding: 10px;
          height: 50px;
          width: auto;
          background-color: rgb(242, 247, 252);
     }
     .btn-submit {
          margin-top: 40px;
     }
     .btn-back{
          margin-top: 10px;
     }
</style>