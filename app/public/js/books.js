const bookApp = {
    data() {
      return {
        books: [],
        selectedBook: null,
        bookForm:{}
        
        }
    },
    computed: {
        
    },
    methods: {
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
        fetchBookData() {
            fetch('api/books/')
            .then(response => response.json())
            .then((parsedJson) => {
                console.log(parsedJson);
                this.books = parsedJson;
                console.log("C");
            })
            .catch( err => {
                console.error(err)
            })

            console.log("B");
        },
        postBook(evt) {
            if (this.selectedBook === null) {
                this.postNewBook(evt);
            } else {
                this.postEditBook(evt);
            }
          },
        postNewBook(evt) { //event handler for form submission, event object is the default 
            //select the student id and add another offer into this student     
            console.log("Posting:", this.bookForm);
            alert("Posting!");
    
            fetch('api/books/create.php', {
                method:'POST',
                body: JSON.stringify(this.bookForm),
                headers: {
                "Content-Type": "application/json; charset=utf-8"
                }
            })
            .then( response => response.json() )
            .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.books = json;
                
                // reset the form
                this.bookForm = {};
            });
        },
        
        postEditBook(evt) {
            this.bookForm.id = this.selectedBook.id;       
            
            console.log("Updating!", this.bookForm);
      
            fetch('api/books/update.php', {
                method:'POST',
                body: JSON.stringify(this.bookForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.books = json;
                
                this.resetBookForm();
              });
          },
        
          postDeleteBook(o) {
            if (!confirm("Are you sure you want to delete the book")) {
                return;
            }
            
            fetch('api/books/delete.php', {
                method:'POST',
                body: JSON.stringify(o),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.books = json;
                
                this.resetBookForm();
              });
          },

            selectBook(o) {
            this.selectedBook = o;
            this.bookForm = Object.assign({}, this.selectedBook);
            },
            resetBookForm() {
                this.selectedBook = null;
                this.bookForm = {};
            }


    },
    created() {
        this.fetchBookData();
    }
    
}

  
Vue.createApp(bookApp).mount('#booksApp');