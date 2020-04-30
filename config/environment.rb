# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!

config.action_mailer.delivery_method = :smtp

config.action_mailer.smtp_settings = {

  :user_name => Rails.application.credentials.sendgrid[:SENDGRID_USERNAME],

  :password => Rails.application.credentials.sendgrid[:SENDGRID_PASSWORD],

  :domain => "herokuapp.com",

  :address => "smtp.sendgrid.net",

  :port => 587,

  :authentication => :plain,

  :enable_starttls_auto => true

}