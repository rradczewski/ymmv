require "mimemagic"

module ImageEncodeCache
  @@cached_base64_codes = Hash.new

  def cached_base64_codes
    @@cached_base64_codes
  end

  def cached_base64_codes= val
    @@cached_base64_codes = val
  end
end

module Jekyll
  class ImageEncodeTag < Liquid::Tag
    include ImageEncodeCache

    def initialize(tag_name, markup, options)
      @markup = markup
      super
    end

    def render(context)
      require 'base64'

      file = Liquid::Template.parse(@markup).render(context).strip
      site = context.registers[:site]

      encoded_image = ''
      image_handle = File.open(File.join(site.dest, file))

      if self.cached_base64_codes.has_key? file
        encoded_image = self.cached_base64_codes[file]
      else
        puts "Caching #{file} as local base64 string ..."
        encoded_image = Base64.strict_encode64(image_handle.read)
        self.cached_base64_codes.merge!(file => encoded_image)
      end

      data_type = MimeMagic.by_magic(image_handle)
      image_handle.close

      "data:#{data_type};base64,#{encoded_image}"
    end
  end
end

Liquid::Template.register_tag('base64', Jekyll::ImageEncodeTag)
