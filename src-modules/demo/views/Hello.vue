<template>
  <div>
    <h2>1{{ count }}</h2>
    <p @click="goHome">home</p>
  </div>
</template>

<script lang="ts">
import { mapState } from "vuex";
import { Subscription } from "rxjs";
// import { ajax } from "rxjs/ajax";
import {} from "rxjs/webSocket";
import { webSocket } from "rxjs/webSocket";
// import { filter } from 'rxjs/operators';
interface Student {
  name: string;
  class?: string;
  age: number;
}

export default {
  name: "Hello",
  props: {
    msg: {
      type: String,
    },
  },
  data() {
    return {
      m1: 2,
      student: {
        name: "li",
        class: "1",
        age: 12,
      } as Student,
      unsubscrition: new Subscription(),
    };
  },
  methods: {
    goHome: function () {
      this.$router.push("/");
    },
  },
  computed: {
    ...mapState({
      count: (state: any) => state.demoModule.count,
    }),
  },
  mounted() {
    // this.unsubscrition = interval(1000).subscribe(()=>console.log(123))
    // ajax
    //   .getJSON("https://img-home.csdnimg.cn/data_json/toolbar/toolbar0707.json")
    //   .subscribe((v) => {
    //     console.log(v);
    //   });
    const subject = webSocket(
      "ws://10.110.2.178:19092/socket.io/?EIO=3&transport=websocket"
    );

    subject.subscribe({
        next: (msg)=>console.log('message received: ' + msg),
        error: (err)=>console.log(err),
        complete: ()=>console.log('complete')
      })
    subject.next({message:{type:"A"}})
    subject.next({message:{type:"b"}})
    subject.next({message:{type:"c"}})
    subject.next({message:{type:"d"}})
    subject.complete();
    subject.error({code: 4000, reason: 'I think our app just broke!'})

    // const subject = webSocket('ws://localhost:8081');

    // const observableA = subject.multiplex(
    //   () => ({ subscribe: "A" }), // When server gets this message, it will start sending messages for 'A'...
    //   () => ({ unsubscribe: "A" }), // ...and when gets this one, it will stop.
    //   (message: any) => message.type === "A" // If the function returns `true` message is passed down the stream. Skipped if the function returns false.
    // );

    // const observableB = subject.multiplex(
    //   // And the same goes for 'B'.
    //   () => ({ subscribe: "B" }),
    //   () => ({ unsubscribe: "B" }),
    //   (message: any) => message.type === "B"
    // );

    // const subA = observableA.subscribe((messageForA) =>
    //   console.log(messageForA)
    // );
    // // At this moment WebSocket connection is established. Server gets '{"subscribe": "A"}' message and starts sending messages for 'A',
    // // which we log here.

    // const subB = observableB.subscribe((messageForB) =>
    //   console.log(messageForB)
    // );
    // // Since we already have a connection, we just send '{"subscribe": "B"}' message to the server. It starts sending messages for 'B',
    // // which we log here.

    // subB.unsubscribe();
    // // Message '{"unsubscribe": "B"}' is sent to the server, which stops sending 'B' messages.

    // subA.unsubscribe();
    // // Message '{"unsubscribe": "A"}' makes the server stop sending messages for 'A'. Since there is no more subscribers to root Subject,
    // // socket connection closes.
  },
  unmounted() {
    this.unsubscrition.unsubscribe();
  },
};
</script>

<style scoped lang="less">
</style>
