# xhr-post-example
An example of how to send POST Request to Server in Node.js
#
npm install
#
Database: `test`
#
CREATE TABLE `tb_users` (
  `id` int(11) NOT NULL,
  `username` varchar(250) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL,
  `status` varchar(250) DEFAULT NULL,
  `role` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_users`
--

INSERT INTO `tb_users` (`id`, `username`, `password`, `status`, `role`) VALUES
(1, 'root', '5abc1a73eaf2cf00b7796673ced80ef9:172b1b388b5028792f0b3ed220f859de', 'active', 'admin');

# Test username / password
root / adpass
