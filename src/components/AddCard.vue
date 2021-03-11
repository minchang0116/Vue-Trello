<template>
  <div class="add-card">
    <form @submit.prevent="onSubmit">
      <input class="form-control" type="text" v-model="inputTitle" ref="inputText">
      <button class="btn" :class="{'btn-dark':invalidInput, 'btn-success':!invalidInput}" type="submit" :disabled="invalidInput">Add Card</button>
      <a class="cancel-add-btn" href="" @click.prevent="$emit('close')">&times;</a>
    </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  props: ['listId'],
  data() {
    return {
      inputTitle: ''
    }
  },
  computed: {
      invalidInput() {
          return !this.inputTitle.trim()
      }
  },
  mounted() {
      this.$refs.inputText.focus()
      this.setupClickOutSide()
  },
  beforeDestroy(){
      document.querySelector('body').removeEventListener('click', this.handlerClickOutSide)
  },
  methods: {
      ...mapActions([
          'ADD_CARD'
      ]),
      onSubmit(){
          if(this.invalidInput) return
          const {inputTitle, listId} = this
          const pos = this.newCardPos()
          this.ADD_CARD({title: inputTitle, listId, pos})
            .finally(() => this.inputTitle = '' )

      },
      newCardPos(){
        const curList = this.$store.state.board.lists.filter(l => l.id === this.listId)[0]
        if(!curList) return 65535
        const {cards} = curList
        if(!cards.length) return 65535
        return cards[cards.length - 1].pos * 2
      },
      handlerClickOutSide(e){
        if(this.$el.contains(e.target)) return
        this.$emit('close')
      },
      setupClickOutSide(){
          document.querySelector('body').addEventListener('click', this.handlerClickOutSide)
      },
  }
}
</script>

<style>
.btn-dark{
    
    background-color: black;
    box-shadow: 0 1px 0 #519839;
}
.add-card {
  padding: 10px;
  display: block;
  position: relative;
}
.add-card .cancel-add-btn {
  display: inline-block;
  margin-left: 10px;
  vertical-align: middle;
  text-decoration: none;
  color: #888;
  font-size: 24px;
}
.add-card .cancel-add-btn:hover,
.add-card .cancel-add-btn:focus {
  color: #666;
}
</style>