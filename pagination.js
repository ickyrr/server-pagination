Clicks = new Meteor.Collection('clicks');

if (Meteor.isClient) {

  Template.hello.onCreated(function(){
    this.pagination = new Meteor.Pagination(Clicks, {
        sort: {
            _id: -1
        },
        perPage: 20,
        filters: {_id: Session.get('searchTerm')}
    });

  });

  Template.hello.helpers({
    templatePagination: function () {
        return Template.instance().pagination;
    },
    documents: function () {
        return Template.instance().pagination.getPage();
    }
  });

  Template.hello.events({
    'submit form': function(e){
      e.preventDefault();

      var search = $('#searchInput').val();
      Session.set('searchTerm', search);
    }
  });


}

if (Meteor.isServer) {
  new Meteor.Pagination(Clicks);

}
