---
tags: posts
layout: blog.njk
title: "Favorite Ruby tricks"
description: Toy problems using Ruby's capacity to manipulate arrays, hashes and strings
date: 2025-06-24T12:00:00
---

# {{ title }}
## {{ description }}

John Skiles Skinner \
{{ date | postDate }}

---

A near-guilty pleasure of mine is little riddles in Ruby that rely on the language's rich Array, Hash, and String methods. [Just look at](https://apidock.com/ruby/v2_5_5/Array/transpose) Ruby's `transpose` method and tell me you're not aching to find some clever way to put it to work!

These questions happen to come up in job interviews a lot. If the interviewer gives me a choice of language, I will pick Ruby every time. Even when I get the vibe that Python would be the more fashionable choice, which is frequently.

Below are some toy problems I consider fun. I plan to add more to this post as they come to me.

### Sort an array "around" certain elements

The challenge is to sort an array, except for selected elements which are to be left in place. For example, given the array:
```
array = ['b', 'd', '|', 'a', '|', 'c']
```
sort it in such a way that all the letters are in alphabetical order but the pipe (`|`) characters stay in the same place. The sorted letters should "flow around" the pipes without disturbing them.

My approach is to extract from the array the smaller array of letters we want to sort, sort them, and then collate them back into the original array.

```ruby
# the array we are given
array = ['b', 'd', '|', 'a', '|', 'c']

# Remove the pipes from the array and sort the letters
# in reverse-alphabetical order, because later when
# we use`pop` it will be reversed again
smaller = array.reject{|e| e == '|'}.sort.reverse

# Iterate over the original array, modifying it so that
# every letter (every non-pipe) is replaced by a letter
# from the sorted array in reversed (pop) order
array.map!{|e| e == '|' ? e : smaller.pop}

puts array.inspect
# prints the result:
# ["a", "b", "|", "c", "|", "d"]
```

A fun detail is that I use a method, `map!`, that ends in an exclamation point (`!`) which is Ruby's way of warning that a method is *more dangerous* than its equivalent without punctuation. These "bang methods" modify or replace the object that they are called on, rather than modifying a copy. This means that I don't need to set up a new variable to hold the result I am about to print.

A curiosity is `.sort.reverse`. Per my benchmarking, sorting in ascending (alphabetical) order followed by reversing *is actually faster* than sorting in descending order.

![A Pez dispenser in action, featuring the head of Hello Kitty](/img/pez_dispenser.jpg)

*Image: a Pez dispenser outputting a single item, similar to a stack in computer science*

Another fun part for me is using `pop` because I get to treat the array like a stack. It becomes a Pez dispenser; a creaky spring pushes the pez (array items) to the top, one at a time in a strict order, where they can be popped out of the thing. When I feed these items back into the larger array, the pez dispenser technique guarantees their order and that they are each used only once.

I got approximately this question on a job interview at Apple one time. Also, it is somewhat similar to [Leetcode problem #27](https://leetcode.com/problems/remove-element/). Thanks to [Steven Clontz](https://clontz.org/) for making my code one line shorter by [reminding me](https://bsky.app/profile/clontz.org/post/3lsfdppqcvs2o) to use `reject` instead of relying on `map` for everthing, as you will see I always do.

### Longest common prefix

This is just [Leetcode #14](https://leetcode.com/problems/longest-common-prefix/) but I had fun with it. The challenge is to find the longest common prefix string in an array of strings. In other words, the longest shared, leading substring. For example, given the array:
```
array = ['fish', 'fishing', 'fiscal', 'finagle']
```
the longest common prefix is `fi`.

The essence of my approach is to crack every string into arrays; transpose (*yes!*) the arrays so that they become an array of the first letter, the second letter, and so on; then identify how many of these arrays starting from the beginning of each word consist of only a single letter. Leetcode requires the code to be a function; I also want to use a function so I can `return` from it.

```ruby
def longest_common_prefix(strs)

  # Guards, catch simple edge cases
  return "" if strs.include? ""
  return strs[0] if strs.length == 1

  # Trim every string to the length of the
  # shortest, and convert strings to an array
  lengths = strs.map{|s| s.length}
  shortest = lengths.min
  strs.map!{|s| s.split('')}
  strs.map!{|s| s[0..shortest-1]}

  # Switch the columns and rows of the array
  transposed = strs.transpose
  # When every letter in the array is the same
  # shrink down the array to that letter alone
  transposed.map!{|a| a.uniq}

  output = String.new
  # While the arrays contain only one letter, 
  # add it to the output, then return it
  for i in transposed
    if i.length == 1
      output = output << i[0]
    else
      return output
    end
  end

  # Catch cases in which all strings are only
  # 1 character, thus never triggering the
  # previous return 
  return transposed.flatten.join()
end
```

An interesting wrinkle is that `transpose` can only operate on arrays of equal length. It is built to operate on a matrix &mdash; or an array of arrays, which is how matrices are implemented in Ruby. To fill out a nice neat square matrix shape, the sub-arrays must all have the same number of elements.

I just chop off the ragged right edge of the matrix. No characters there can possibly be in the longest common prefix, because they are not shared by every word. Stated another way: I trim each word to the length of the shortest word because the possible shared characters among all words are necessarily contained in shortest word.

![Text in which the "ragged right" has been highlighted. Below a photo of a woman with a bull, the text reads: Molly Flagg Knudsen was a Nevada cattle rancher, writer, and Nevada State Museum trustee. As a Nevada Regent from 1960-1980, she helped to establish the Desert Research Institute, the University of Nevada Press, and the community college system. Courtesy of University Archives, University of Nevada, Reno Libraries](/img/ragged_right.png)

*Image: the concept of "ragged right" in [typographic alignment](https://en.wikipedia.org/wiki/Typographic_alignment) applies to trimming the rightmost portion of our matrix of strings*

I have a habit of avoiding indentation by using implicit or near-implicit loops that fit on one line. In the above code I use `map` or `map!` four times, each of which is an iteration over the array. The code might be oodles faster if I only iterated once. But, for these toy problems, I prefer the conceptual simplicity of a single line that does a single thing to every element across the array.
