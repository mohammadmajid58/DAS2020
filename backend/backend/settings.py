import os
from decouple import config

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SECRET_KEY = config("SECRET_KEY")

# INSERT HEADERS AND HTTPS FLAGS HERE

DEBUG = config("DEBUG", cast=bool)
if DEBUG:
    STATIC_URL = '/static/'
    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
else:
    STATIC_URL = '/react-frontend/build/static/'
    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

ALLOWED_HOSTS = ["127.0.0.1", "teamdas123.pythonanywhere.com", config("PRODUCTION_HOST_URL")]
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
}

REST_SESSION_LOGIN = True
SITE_ID = 1

ACCOUNT_AUTHENTICATION_METHOD = 'username'

REST_AUTH_SERIALIZERS = {
    'PASSWORD_RESET_SERIALIZER':
        'api.serializers.PasswordResetSerializer',
}

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_auth',
    'rest_framework.authtoken',
    'rest_framework',
    'api',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'corsheaders.middleware.CorsPostCsrfMiddleware',
]

CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000',
)

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'react-frontend'), os.path.join(BASE_DIR, 'email_templates'), ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'react-frontend', "build", "static"),  # update the STATICFILES_DIRS
)

WSGI_APPLICATION = 'backend.wsgi.application'

# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

env = config("ENV")
db = config("DB_ENGINE")
engine = 'django.db.backends.sqlite3'

if env == 'production':
    if db == 'mysql':
        engine = 'django.db.backends.mysql'
    elif db == "postgres":
        engine = 'django.db.backends.postgresql_psycopg2'
    DATABASES = {
        'default': {
            'ENGINE': engine,
            'NAME': config("DB_NAME"),
            'USER': config("DB_USER"),
            'PASSWORD': config("DB_PASSWORD"),
            'HOST': config("DB_HOST"),
            'PORT': config("DB_PORT"),
        }
    }

else:
    DATABASES = {
        'default': {
            'ENGINE': engine,
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }

if env == "production":
    EMAIL_HOST = config("EMAIL_HOST")
    EMAIL_USE_TLS = config("EMAIL_USE_TLS", cast=bool)
    EMAIL_PORT = config("EMAIL_PORT", cast=int)
    EMAIL_HOST_USER = config("EMAIL_ADDRESS")
    EMAIL_HOST_PASSWORD = config("EMAIL_PASSWORD")
    DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True
