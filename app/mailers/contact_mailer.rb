class ContactMailer < ActionMailer::Base
  default to: "joe-github@outlook.com"
  default from: "joe-github@outlook.com"

  def send_comments(name, email, comments)
    @name = name
    @email = email
    @comments = comments
    @mailer_name = "Dev Match form submission"

    mail(subject: "Dev Match contact form", reply_to: email)
  end
end
