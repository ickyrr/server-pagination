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

    'keydown #searchInput': function (e) {
      var input = $('[name=searchInput]').val();

      Template.instance().pagination.filters({"_id": {"$regex":input, "$options": "i"}});

    }

  });


}








if (Meteor.isServer) {
  new Meteor.Pagination(Clicks);

}
