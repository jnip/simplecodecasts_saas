class ContactsController < ApplicationController
  def new
    @contact = Contact.new
  end

  def create
    @contact = Contact.new(contact_params)
    error = !@contact.save
    exception = false

    unless error
      begin
        contact_emailComments
      rescue Exception => e
        error = true
        exception = e
      end
    end

    if error
      flash[:danger] = "Error occured, message has not been sent."
      if exception
        flash[:warning] = exception
      end
      redirect_to new_contact_path
    else
      flash[:success] = "Message Sent."
      redirect_to new_contact_path
    end
  end

  private
    def contact_params
      params.require(:contact).permit(:name, :email, :comments)
    end

    def contact_emailComments
      name = params[:contact][:name]
      email = params[:contact][:email]
      comments = params[:contact][:comments]

      ContactMailer.send_comments(name, email, comments).deliver
    end
end
